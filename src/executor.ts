import * as _ from 'lodash'
import { assert } from './util'
import { EventEmitter } from 'events'
import { insert, select, update, del, allFields, exec, invoke, input, field } from './builder'
import { Parameter, AST, Select, JsConstant, UnsureIdentity, UnsureExpressions, SortInfo, Conditions, Statement, Assignment, KeyValueObject, Identifier, UnsureConditions } from './ast'
import { Parser, Ployfill } from './parser'

interface QueryResult {
  output?: object
  rows?: object[]
  rowsAffected: number
  returnValue?: any
}

// interface QueryParameter {
//    name: string,
//    value: any,
//    direction?: ParameterDirection
// }

export interface QueryHandler {
  (sql: string, params: Parameter[]): Promise<QueryResult>
}

export interface SelectOptions {
  top?: number,
  offset?: number,
  limit?: number,
  distinct?: boolean,
  fields?: string[],
  sorts?: (SortInfo | UnsureExpressions)[]
}

export class Executor extends EventEmitter {

  private _query: QueryHandler
  private _compile: Parser
  private _ployfill: Ployfill

  /**
   * SQL执行器
   * @param {*} query 查询函数
   * @param {*} compile 编译函数
   */
  constructor(query: QueryHandler, compile: Parser, ployfill: Ployfill) {
    super()
    // 是否启用严格模式，避免关键字等问题
    this._query = query
    this._compile = compile
    this._ployfill = ployfill
  }

  // async _internalQuery(sql: string, params: Parameter[]): Promise<QueryResult>
  // async _internalQuery(sql: string, params: Object): Promise<QueryResult>
  // async _internalQuery(sql: string[], ...params: any[]): Promise<QueryResult>
  async _internalQuery(...args) {
    let sql: string, params: Parameter[]
    // 如果是AST直接编译
    if (args[0] instanceof AST) {
      ({ sql, params } = this._compile(args[0]))
    }
    // 如果是模板字符串
    else if (_.isArray(args[0])) {
      params = []
      sql = args[0].reduce((previous, current, index) => {
        previous += current
        if (index < args.length - 1) {
          const name = '__p__' + index
          params.push(input(name, args[index + 1]))
          previous += this._ployfill.parameterPrefix + name
        }
        return previous
      }, '')
    } else {
      assert(_.isString(args[0]), 'sql 必须是字符串或者模板调用')
      sql = args[0]

      if (_.isObject(args[1])) {
        params = Object.entries(args[1]).map(
          ([name, value]) => input(name, value)
        )
      }
    }

    try {
      const res = await this._query(sql, params)
      // 如果有输出参数
      if (res.output) {
        Object.entries(res.output).forEach(([name, value]) => {
          const p = params.find(p => p.name === name)
          p.value = value
          if (p.name === '_ReturnValue_') {
            res.returnValue = value
          }
        })
      }
      return res
    } catch (ex) {
      this.emit('error', ex)
      throw ex
    } finally {
      this.emit('command', { sql, params })
    }
  }

  async query(sql: string, params: Parameter[]): Promise<QueryResult>
  async query(sql: string, params: Object): Promise<QueryResult>
  async query(sql: Statement | Document): Promise<QueryResult>
  async query(sql: string[], ...params: any[]): Promise<QueryResult>
  async query(...args) {
    return this._internalQuery(...args)
  }

  /**
   * 执行一个查询并获取返回的第一个标量值
   * @param sql
   */
  async queryScalar(sql: string, params: Parameter[]): Promise<JsConstant>
  async queryScalar(sql: string, params: Object): Promise<JsConstant>
  async queryScalar(sql: Statement | Document): Promise<JsConstant>
  async queryScalar(sql: string[], ...params: any[]): Promise<JsConstant>
  async queryScalar(...args) {
    const { rows: [row] } = await this._internalQuery(...args)
    assert(row, 'sql not return recordsets.')
    return row[Object.keys(row)[0]]
  }

  /**
   * 插入数据的快捷操作
   * @param {*} table
   * @param {array?} fields 字段列表，可空
   * @param {*} rows 可接受二维数组/对象，或者单行数组
   */
  async insert(table: UnsureIdentity, select: Select)
  async insert(table: UnsureIdentity, fields: UnsureIdentity[], select: Select)
  async insert(table: UnsureIdentity, rows: KeyValueObject[])
  async insert(table: UnsureIdentity, row: KeyValueObject)
  async insert(table: UnsureIdentity, fields: UnsureIdentity[], rows: UnsureExpressions[][])
  async insert(table: UnsureIdentity, ...args) {
    let fields: UnsureIdentity[], rows
    if (args.length > 2) {
      fields = args[0]
      rows = args[1]
    } else {
      rows = args[0]
    }

    const sql = insert(table, fields)
    // one row => rows
    if (!_.isArray(rows) || !_.isArray(rows[0])) {
      rows = [rows]
    }

    if (_.isArray(rows[0])) {
      sql.values(...rows as UnsureExpressions[][])
    } else {
      sql.values(...rows as KeyValueObject[])
    }
    const res = await this.query(sql)
    return res.rowsAffected
  }

  async find(table: UnsureIdentity, where: Conditions, fields?: string[]) {
    let columns: UnsureExpressions[]
    if (fields) {
      columns = fields.map(fieldName => field(fieldName))
    } else {
      columns = [allFields]
    }
    const sql = select(...columns).top(1).from(table).where(where)
    const res = await this.query(sql)
    if (res.rows && res.rows.length > 0) {
      return res.rows[0]
    }
    return null
  }

  /**
   * 简化版的SELECT查询，用于快速查询，如果要用复杂的查询，请使用select语句
   * @param table
   * @param where
   * @param options
   */
  async select(table: UnsureIdentity, where?: UnsureConditions, options: SelectOptions = {}) {
    const { sorts, offset, limit, fields } = options
    let columns: UnsureExpressions[]
    if (fields) {
      columns = fields.map(fieldName => field(fieldName))
    } else {
      columns = [allFields]
    }
    const sql = select(...columns).from(table)
    if (where) {
      sql.where(where)
    }
    if (sorts) {
      sql.orderby(sorts)
    }
    if (!_.isUndefined(offset)) {
      sql.offset(offset)
    }
    if (!_.isUndefined(limit)) {
      sql.limit(limit)
    }
    const res = await this.query(sql)
    return res.rows
  }

  async update(table: UnsureIdentity, sets: Assignment[], where?: UnsureConditions)
  async update(table: UnsureIdentity, sets: KeyValueObject, where?: UnsureConditions)
  async update(table: UnsureIdentity, sets: KeyValueObject | Assignment[], where?: UnsureConditions) {
    const sql = update(table)
    if (_.isArray(sets)) {
      sql.set(...sets)
    } else {
      sql.set(sets)
    }
    if (where) sql.where(where)
    const res = await this.query(sql)
    return res.rowsAffected
  }

  async delete(table: UnsureIdentity, where?: UnsureConditions) {
    const sql = del(table)
    if (where) sql.where(where)
    const res = await this.query(sql)
    return res.rowsAffected
  }

  async execute(spname, params) {
    const sql = exec(spname, params)
    const res = await this.query(sql)
    return res
  }
}