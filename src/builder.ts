import {
  Condition,
  Parameter,
  Document,
  Identifier,
  Statement,
  Expression,
  Expressions,
  Raw,
  JsConstant,
  Constant,
  Model,
  Name,
  ProxiedRowset,
  TableFuncInvoke,
} from "./ast";
import { makeProxiedRowset } from "./util";

/**
 * not 查询条件运算
 */
export const not = Condition.not;

/**
 * 使用and关联多个查询条件
 * @static
 * @param conditions 要关联的查询条件列表
 * @returns  condition
 * @memberof SQL
 */
export const and = Condition.and;
/**
 * 使用or关联多个查询条件
 * @static
 * @param conditions 要关联的查询条件列表
 * @returns  condition
 * @memberof SQL
 */
export const or = Condition.or;

/**
 * exists语句
 * @static
 * @param select
 * @returns
 * @memberof SQL
 */
export const exists = Condition.exists;

export const exec = Statement.execute;

export const execute = Statement.execute;

export const when = Statement.when;

export const func = Identifier.func;

/**
 * 分组查询条件
 */
export const group = Condition.group;

/**
 * input 参数
 */
export const input = Parameter.input;

/**
 * output参数
 */
export const output = Parameter.output;

/**
 * 创建一个SELECT语句
 */
export const select = Statement.select;

/**
 * 创建一个字段
 */
export const field = Identifier.field;

/**
 * 创建一个原始的SQL片段
 * 可以插入到SQL的任意位置
 * @param sql 原始SQL
 */
export function raw(sql: string): any {
  return new Raw(sql);
}

/**
 * 创建一个SQL文档，包含多条SQL语句、
 * @param statements SQL语句
 */
export const doc = function (...statements: Statement[]) {
  return new Document(...statements);
};

/**
 * 创建一个INSERT语句
 */
export const insert = Statement.insert;

export const $case = Statement.case;

export const $with = Statement.with;

/**
 * 创建一个UPDATE语句
 */
export const update = Statement.update;

/**
 * 内建标识符，不会被 [] 包裹，buildIn的别名
 * @param name
 */
export const builtIn = Identifier.builtIn;

/**
 * 创建一个DELETE语句
 */
export const del = Statement.delete;

export const $delete = Statement.delete;

export const star = Identifier.star;

/**
 * 等效于star
 */
export const _ = Identifier.star;

/**
 * 创建表对象，该对象是可代理的，可以直接以 . 运算符获取下一节点Identifier
 * @param name
 */
export const table = Identifier.table;

/**
 * 表值函数
 * @param names
 */
export function tableFn<T extends Model>(
  name: Name<string>,
  builtIn = false
): (...args: Expressions<JsConstant>[]) => ProxiedRowset<TableFuncInvoke<T>> {
  return function (
    ...args: Expressions<JsConstant>[]
  ): ProxiedRowset<TableFuncInvoke<T>> {
    return makeProxiedRowset(
      Statement.invokeAsTable<T>(Identifier.func(name, builtIn), args)
    );
  };
}

/**
 * 表值函数
 * @param names
 */
export function scalarFn<T extends JsConstant>(
  name: Name<string>,
  builtIn = false
): (...args: Expressions<JsConstant>[]) => Expression<T> {
  return function (...args: Expressions<JsConstant>[]): Expression<T> {
    return Statement.invokeAsScalar<T>(Identifier.func(name, builtIn), args);
  };
}

export const proc = Identifier.proc;

export const constant = Constant.const;

export const variant = Identifier.variant;

export const union = Statement.union;
export const unionAll = Statement.unionAll;

export const add = Expression.add;
export const div = Expression.div;
export const mul = Expression.mul;
export const sub = Expression.sub;
export const bitAnd = Expression.and;
export const bitOr = Expression.or;
export const bitXor = Expression.xor;
export const shl = Expression.shl;
export const shr = Expression.shr;
export const bitNot = Expression.not;
export const neg = Expression.neg;
export const mod = Expression.mod;
export const concat = Expression.concat;
export const bracket = Expression.bracket;

/**
 * 语句
 */
export const SQL = {
  select,
  insert,
  update,
  delete: $delete,
  del: $delete,
  case: $case,
  with: $with,
  tableFn,
  scalarFn,
  execute,
  exec,
  when,
  exists,
  union,
  unionAll,
  builtIn,
  table,
  field,
  input,
  output,
  and,
  or,
  variant,
  var: variant,
  group,
  raw,
  add,
  div,
  mul,
  sub,
  bitAnd,
  bitOr,
  bitXor,
  shl,
  shr,
  bitNot,
  neg,
  mod,
  concat,
  bracket,
};

export default SQL;

export type JsConstantConstructor =
  | typeof String
  | typeof Number
  | typeof ArrayBuffer
  | typeof Date
  | typeof Boolean
  | typeof BigInt;

export type JsConstantName =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "bigint"
  | "binary";

/**
 * 类型转换运算
 */
export const convert = Expression.convert;

// TODO: 建立命令查询器，针对model的
/**
 * 命令生成器
 * 用于深度查询
 */
export interface CommandBuilder {
  sql: string[];
  params: Set<Parameter>;
}
