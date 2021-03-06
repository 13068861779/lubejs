[lubejs](../README.md) › [Globals](../globals.md) › ["ast"](../modules/_ast_.md) › [Update](_ast_.update.md)

# Class: Update

## Hierarchy

  ↳ [Fromable](_ast_.fromable.md)

  ↳ **Update**

## Index

### Constructors

* [constructor](_ast_.update.md#constructor)

### Properties

* [filters](_ast_.update.md#optional-filters)
* [joins](_ast_.update.md#optional-joins)
* [sets](_ast_.update.md#sets)
* [table](_ast_.update.md#table)
* [tables](_ast_.update.md#optional-tables)
* [type](_ast_.update.md#readonly-type)

### Methods

* [from](_ast_.update.md#from)
* [join](_ast_.update.md#join)
* [leftJoin](_ast_.update.md#leftjoin)
* [set](_ast_.update.md#set)
* [where](_ast_.update.md#where)
* [assign](_ast_.update.md#static-assign)
* [bracket](_ast_.update.md#static-bracket)
* [case](_ast_.update.md#static-case)
* [declare](_ast_.update.md#static-declare)
* [delete](_ast_.update.md#static-delete)
* [exec](_ast_.update.md#static-exec)
* [execute](_ast_.update.md#static-execute)
* [insert](_ast_.update.md#static-insert)
* [select](_ast_.update.md#static-select)
* [update](_ast_.update.md#static-update)
* [when](_ast_.update.md#static-when)

## Constructors

###  constructor

\+ **new Update**(`table`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier)): *[Update](_ast_.update.md)*

*Overrides [AST](_ast_.ast.md).[constructor](_ast_.ast.md#constructor)*

Defined in src/ast.ts:2191

**Parameters:**

Name | Type |
------ | ------ |
`table` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) |

**Returns:** *[Update](_ast_.update.md)*

## Properties

### `Optional` filters

• **filters**? : *[Condition](_ast_.condition.md)*

*Inherited from [Fromable](_ast_.fromable.md).[filters](_ast_.fromable.md#optional-filters)*

Defined in src/ast.ts:1839

___

### `Optional` joins

• **joins**? : *[Join](_ast_.join.md)[]*

*Inherited from [Fromable](_ast_.fromable.md).[joins](_ast_.fromable.md#optional-joins)*

Defined in src/ast.ts:1838

___

###  sets

• **sets**: *[Assignment](_ast_.assignment.md)[]*

Defined in src/ast.ts:2191

___

###  table

• **table**: *[Identifier](_ast_.identifier.md)*

Defined in src/ast.ts:2190

___

### `Optional` tables

• **tables**? : *[Identifier](_ast_.identifier.md)[]*

*Inherited from [Fromable](_ast_.fromable.md).[tables](_ast_.fromable.md#optional-tables)*

Defined in src/ast.ts:1837

___

### `Readonly` type

• **type**: *[SQL_SYMBOLE](../enums/_constants_.sql_symbole.md)*

*Inherited from [AST](_ast_.ast.md).[type](_ast_.ast.md#readonly-type)*

Defined in src/ast.ts:73

## Methods

###  from

▸ **from**(...`tables`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier)[]): *this*

*Inherited from [Fromable](_ast_.fromable.md).[from](_ast_.fromable.md#from)*

Defined in src/ast.ts:1845

从表中查询，可以查询多表

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...tables` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier)[] |   |

**Returns:** *this*

___

###  join

▸ **join**(`table`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier), `on`: [Condition](_ast_.condition.md), `left`: boolean): *this*

*Inherited from [Fromable](_ast_.fromable.md).[join](_ast_.fromable.md#join)*

Defined in src/ast.ts:1858

表联接

**`memberof`** Select

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`table` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) | - |
`on` | [Condition](_ast_.condition.md) | - |
`left` | boolean | false |

**Returns:** *this*

___

###  leftJoin

▸ **leftJoin**(`table`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier), `on`: [Condition](_ast_.condition.md)): *this*

*Inherited from [Fromable](_ast_.fromable.md).[leftJoin](_ast_.fromable.md#leftjoin)*

Defined in src/ast.ts:1874

左联接

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`table` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) | - |
`on` | [Condition](_ast_.condition.md) |   |

**Returns:** *this*

___

###  set

▸ **set**(`sets`: [AssignObject](../modules/_ast_.md#assignobject)): *this*

Defined in src/ast.ts:2205

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sets` | [AssignObject](../modules/_ast_.md#assignobject) |   |

**Returns:** *this*

▸ **set**(...`sets`: [Assignment](_ast_.assignment.md)[]): *this*

Defined in src/ast.ts:2206

**Parameters:**

Name | Type |
------ | ------ |
`...sets` | [Assignment](_ast_.assignment.md)[] |

**Returns:** *this*

___

###  where

▸ **where**(`condition`: [UnsureCondition](../modules/_ast_.md#unsurecondition)): *this*

*Inherited from [Fromable](_ast_.fromable.md).[where](_ast_.fromable.md#where)*

Defined in src/ast.ts:1882

where查询条件

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`condition` | [UnsureCondition](../modules/_ast_.md#unsurecondition) |   |

**Returns:** *this*

___

### `Static` assign

▸ **assign**(`left`: [Expression](_ast_.expression.md), `right`: [UnsureExpression](../modules/_ast_.md#unsureexpression)): *[Assignment](_ast_.assignment.md)‹›*

*Inherited from [Statement](_ast_.statement.md).[assign](_ast_.statement.md#static-assign)*

Defined in src/ast.ts:1365

赋值语句

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`left` | [Expression](_ast_.expression.md) | 左值 |
`right` | [UnsureExpression](../modules/_ast_.md#unsureexpression) | 右值  |

**Returns:** *[Assignment](_ast_.assignment.md)‹›*

___

### `Static` bracket

▸ **bracket**‹**T**›(`context`: T): *[Bracket](_ast_.bracket.md)‹T›*

*Inherited from [AST](_ast_.ast.md).[bracket](_ast_.ast.md#static-bracket)*

Defined in src/ast.ts:75

**Type parameters:**

▪ **T**: *[AST](_ast_.ast.md)*

**Parameters:**

Name | Type |
------ | ------ |
`context` | T |

**Returns:** *[Bracket](_ast_.bracket.md)‹T›*

___

### `Static` case

▸ **case**(`expr?`: [UnsureExpression](../modules/_ast_.md#unsureexpression)): *[Case](_ast_.case.md)‹›*

*Inherited from [Statement](_ast_.statement.md).[case](_ast_.statement.md#static-case)*

Defined in src/ast.ts:1386

**Parameters:**

Name | Type |
------ | ------ |
`expr?` | [UnsureExpression](../modules/_ast_.md#unsureexpression) |

**Returns:** *[Case](_ast_.case.md)‹›*

___

### `Static` declare

▸ **declare**(...`declares`: [VariantDeclare](_ast_.variantdeclare.md)[]): *[Declare](_ast_.declare.md)*

*Inherited from [Statement](_ast_.statement.md).[declare](_ast_.statement.md#static-declare)*

Defined in src/ast.ts:1373

变量声明

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...declares` | [VariantDeclare](_ast_.variantdeclare.md)[] | 变量列表  |

**Returns:** *[Declare](_ast_.declare.md)*

___

### `Static` delete

▸ **delete**(`table`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier)): *[Delete](_ast_.delete.md)‹›*

*Inherited from [Statement](_ast_.statement.md).[delete](_ast_.statement.md#static-delete)*

Defined in src/ast.ts:1325

删除一个表格

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`table` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) | 表格  |

**Returns:** *[Delete](_ast_.delete.md)‹›*

___

### `Static` exec

▸ **exec**(`proc`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier), `params`: [UnsureExpression](../modules/_ast_.md#unsureexpression)[]): *[Execute](_ast_.execute.md)*

*Inherited from [Statement](_ast_.statement.md).[exec](_ast_.statement.md#static-exec)*

Defined in src/ast.ts:1354

执行一个存储过程，execute的别名

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`proc` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) | 存储过程 |
`params` | [UnsureExpression](../modules/_ast_.md#unsureexpression)[] | 参数  |

**Returns:** *[Execute](_ast_.execute.md)*

▸ **exec**(`proc`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier), `params`: [Parameter](_ast_.parameter.md)[]): *[Execute](_ast_.execute.md)*

*Inherited from [Statement](_ast_.statement.md).[exec](_ast_.statement.md#static-exec)*

Defined in src/ast.ts:1355

**Parameters:**

Name | Type |
------ | ------ |
`proc` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) |
`params` | [Parameter](_ast_.parameter.md)[] |

**Returns:** *[Execute](_ast_.execute.md)*

___

### `Static` execute

▸ **execute**(`proc`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier), `params?`: [UnsureExpression](../modules/_ast_.md#unsureexpression)[]): *[Execute](_ast_.execute.md)*

*Inherited from [Statement](_ast_.statement.md).[execute](_ast_.statement.md#static-execute)*

Defined in src/ast.ts:1343

执行一个存储过程

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`proc` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) | - |
`params?` | [UnsureExpression](../modules/_ast_.md#unsureexpression)[] |   |

**Returns:** *[Execute](_ast_.execute.md)*

▸ **execute**(`proc`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier), `params?`: [Parameter](_ast_.parameter.md)[]): *[Execute](_ast_.execute.md)*

*Inherited from [Statement](_ast_.statement.md).[execute](_ast_.statement.md#static-execute)*

Defined in src/ast.ts:1344

**Parameters:**

Name | Type |
------ | ------ |
`proc` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) |
`params?` | [Parameter](_ast_.parameter.md)[] |

**Returns:** *[Execute](_ast_.execute.md)*

___

### `Static` insert

▸ **insert**(`table`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier), `fields?`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier)[]): *[Insert](_ast_.insert.md)‹›*

*Inherited from [Statement](_ast_.statement.md).[insert](_ast_.statement.md#static-insert)*

Defined in src/ast.ts:1309

插入至表,into的别名

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`table` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) | - |
`fields?` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier)[] |   |

**Returns:** *[Insert](_ast_.insert.md)‹›*

___

### `Static` select

▸ **select**(`columns`: [KeyValueObject](../interfaces/_ast_.keyvalueobject.md)): *[Select](_ast_.select.md)*

*Inherited from [Statement](_ast_.statement.md).[select](_ast_.statement.md#static-select)*

Defined in src/ast.ts:1332

选择列

**Parameters:**

Name | Type |
------ | ------ |
`columns` | [KeyValueObject](../interfaces/_ast_.keyvalueobject.md) |

**Returns:** *[Select](_ast_.select.md)*

▸ **select**(...`columns`: [UnsureExpression](../modules/_ast_.md#unsureexpression)[]): *[Select](_ast_.select.md)*

*Inherited from [Statement](_ast_.statement.md).[select](_ast_.statement.md#static-select)*

Defined in src/ast.ts:1333

**Parameters:**

Name | Type |
------ | ------ |
`...columns` | [UnsureExpression](../modules/_ast_.md#unsureexpression)[] |

**Returns:** *[Select](_ast_.select.md)*

___

### `Static` update

▸ **update**(`table`: [UnsureIdentifier](../modules/_ast_.md#unsureidentifier)): *[Update](_ast_.update.md)‹›*

*Inherited from [Statement](_ast_.statement.md).[update](_ast_.statement.md#static-update)*

Defined in src/ast.ts:1317

更新一个表格

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`table` | [UnsureIdentifier](../modules/_ast_.md#unsureidentifier) |   |

**Returns:** *[Update](_ast_.update.md)‹›*

___

### `Static` when

▸ **when**(`expr`: [UnsureExpression](../modules/_ast_.md#unsureexpression), `value?`: [UnsureExpression](../modules/_ast_.md#unsureexpression)): *[When](_ast_.when.md)‹›*

*Inherited from [Statement](_ast_.statement.md).[when](_ast_.statement.md#static-when)*

Defined in src/ast.ts:1382

WHEN 语句块

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`expr` | [UnsureExpression](../modules/_ast_.md#unsureexpression) | - |
`value?` | [UnsureExpression](../modules/_ast_.md#unsureexpression) |   |

**Returns:** *[When](_ast_.when.md)‹›*
