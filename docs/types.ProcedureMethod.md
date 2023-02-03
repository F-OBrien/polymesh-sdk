# Interface: ProcedureMethod<MethodArgs, ProcedureReturnValue, ReturnValue\>

[types](../wiki/types).ProcedureMethod

## Type parameters

| Name | Type |
| :------ | :------ |
| `MethodArgs` | `MethodArgs` |
| `ProcedureReturnValue` | `ProcedureReturnValue` |
| `ReturnValue` | `ProcedureReturnValue` |

## Callable

### ProcedureMethod

▸ **ProcedureMethod**(`args`, `opts?`): `Promise`<`TransactionQueue`<`ProcedureReturnValue`, `ReturnValue`, `unknown`[][]\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `MethodArgs` |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<`ProcedureReturnValue`, `ReturnValue`, `unknown`[][]\>\>

## Table of contents

### Properties

- [checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)

## Properties

### checkAuthorization

• **checkAuthorization**: (`args`: `MethodArgs`, `opts?`: [`ProcedureOpts`](../wiki/types.ProcedureOpts)) => `Promise`<[`ProcedureAuthorizationStatus`](../wiki/types.ProcedureAuthorizationStatus)\>

#### Type declaration

▸ (`args`, `opts?`): `Promise`<[`ProcedureAuthorizationStatus`](../wiki/types.ProcedureAuthorizationStatus)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `MethodArgs` |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

##### Returns

`Promise`<[`ProcedureAuthorizationStatus`](../wiki/types.ProcedureAuthorizationStatus)\>

#### Defined in

[types/index.ts:1454](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1454)
