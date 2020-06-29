import { Condition, Parameter, Invoke, Identity, Statement, Expression, UnsureExpressions } from './ast';
/**
 * not 查询条件运算
 */
export declare const not: typeof Condition.not;
/**
 * 使用and关联多个查询条件
 * @static
 * @param conditions 要关联的查询条件列表
 * @returns  condition
 * @memberof SQL
 */
export declare const and: typeof Condition.and;
/**
 * 使用or关联多个查询条件
 * @static
 * @param conditions 要关联的查询条件列表
 * @returns  condition
 * @memberof SQL
 */
export declare const or: typeof Condition.or;
/**
 * exists语句
 * @static
 * @param select
 * @returns
 * @memberof SQL
 */
export declare const exists: typeof Condition.exists;
export declare const invoke: typeof Expression.invoke;
export declare const exec: typeof Statement.exec;
export declare const execute: typeof Statement.execute;
/**
 * 标识符
 * @returns
 */
export declare const identity: typeof Expression.identity;
/**
 * 创建一个表格标识
 * @param names 表标识限定，如果有多级，请传多个参数
 * @returns
 * @example table(database, schema, tableName) => Identity
 * @example table(tableName) => Identity
 */
export declare const table: typeof Expression.identity;
export declare const field: typeof Expression.identity;
export declare const constant: typeof Expression.constant;
export declare const quoted: typeof Expression.quoted;
/**
 * input 参数
 */
export declare const input: typeof Parameter.input;
/**
 * output参数
 */
export declare const output: typeof Parameter.output;
/**
 * 变量引用
 */
export declare const variant: typeof Expression.variant;
/**
 * 创建一个别名
 */
export declare const alias: typeof Expression.alias;
/**
 * 创建一个SELECT语句
 */
export declare const select: typeof Statement.select;
/**
 * 创建一个INSERT语句
 */
export declare const insert: typeof Statement.insert;
/**
 * 创建一个UPDATE语句
 */
export declare const update: typeof Statement.update;
/**
 * 创建一个DELETE语句
 */
export declare const del: typeof Statement.delete;
export declare const allFields: Identity;
export declare function count(exp: UnsureExpressions): Invoke;
export declare function stdev(exp: UnsureExpressions): Invoke;
export declare function sum(exp: UnsureExpressions): Invoke;
export declare function avg(exp: UnsureExpressions): Invoke;
export declare function max(exp: UnsureExpressions): Invoke;
export declare function min(exp: UnsureExpressions): Invoke;
export declare function nvl(exp: UnsureExpressions, defaults: UnsureExpressions): Invoke;
export declare function abs(exp: UnsureExpressions): Invoke;
export declare function ceil(exp: UnsureExpressions): Invoke;
export declare function exp(exp: UnsureExpressions): Invoke;
export declare function square(exp: UnsureExpressions): Invoke;
export declare function floor(exp: UnsureExpressions): Invoke;
export declare function round(exp: UnsureExpressions, digit: UnsureExpressions): Invoke;
export declare function sign(exp: UnsureExpressions): Invoke;
export declare function sqrt(exp: UnsureExpressions): Invoke;
export declare function power(exp: UnsureExpressions, pwr: UnsureExpressions): Invoke;