const mssql = require('mssql')
const {
  ParameterDirection,
  IsolationLevel
} = require('../../../lib/constants')

const ployfill = require('./ployfill')

const IsolationLevelMapps = {
  [IsolationLevel.READ_COMMIT]: mssql.ISOLATION_LEVEL.READ_COMMITTED,
  [IsolationLevel.READ_UNCOMMIT]: mssql.ISOLATION_LEVEL.READ_UNCOMMITTED,
  [IsolationLevel.SERIALIZABLE]: mssql.ISOLATION_LEVEL.SERIALIZABLE,
  [IsolationLevel.REPEATABLE_READ]: mssql.ISOLATION_LEVEL.REPEATABLE_READ,
  [IsolationLevel.SNAPSHOT]: mssql.ISOLATION_LEVEL.SNAPSHOT
}

// const typeMapps = {
//   [STRING]: mssql.NVarChar(4000),
//   [NUMBER]: mssql.Real,
//   [DATE]: mssql.DateTime2,
//   [BOOLEAN]: mssql.Bit,
//   [BUFFER]: mssql.Image
// }

async function doQuery(driver, sql, params = []) {
  const request = await driver.request()
  params.forEach(({ name, value, dataType: type, direction = ParameterDirection.INPUT }) => {
    if (direction === ParameterDirection.INPUT) {
      if (type) {
        request.input(name, typeMapps[type], value)
      } else {
        request.input(name, value)
      }
    } else if (direction === ParameterDirection.OUTPUT) {
      if (value === undefined) {
        request.output(name, typeMapps[type])
      } else {
        request.output(name, typeMapps[type], value)
      }
    }
  })
  let res
  try {
    res = await request.query(sql)
  } catch (ex) {
    await request.cancel()
    throw ex
  }
  const result = {
    rows: res.recordset,
    rowsAffected: res.rowsAffected[0],
    returnValue: res.returnValue,
    output: res.output
  }
  if (res.recordsets) {
    // 仅MSSQL支持该属性，并不推荐使用
    result._recordsets = res.recordsets
  }
  return result
}

class Provider {
  constructor(pool) {
    this._pool = pool
    // this.ployfill = ployfill
  }

  get ployfill() {
    return ployfill
  }

  async query(sql, params) {
    const res = await doQuery(this._pool, sql, params)
    return res
  }

  async beginTrans(isolationLevel = IsolationLevel.READ_COMMIT) {
    const trans = this._pool.transaction()
    await trans.begin(IsolationLevelMapps[isolationLevel])
    return {
      ployfill,
      async query(sql, params) {
        const res = await doQuery(trans, sql, params)
        return res
      },
      async commit() {
        await trans.commit()
      },
      async rollback() {
        if (!trans._aborted) {
          await trans.rollback()
        }
      }
    }
  }

  /**
  * 关闭所有连接
  * @memberof Pool
  */
  async close() {
    await this._pool.close()
  }
}

module.exports = {
  Provider
}
