# Class: Requirements

[api/entities/Asset/Compliance/Requirements](../wiki/api.entities.Asset.Compliance.Requirements).Requirements

Handles all Asset Compliance Requirements related functionality

## Hierarchy

- `Namespace`<[`Asset`](../wiki/api.entities.Asset.Asset)\>

  ↳ **`Requirements`**

## Table of contents

### Methods

- [add](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#add)
- [arePaused](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#arepaused)
- [checkSettle](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#checksettle)
- [get](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#get)
- [modify](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#modify)
- [pause](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#pause)
- [remove](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#remove)
- [reset](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#reset)
- [set](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#set)
- [unpause](../wiki/api.entities.Asset.Compliance.Requirements.Requirements#unpause)

## Methods

### add

▸ **add**(`args`, `opts?`): `Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

Add a new compliance requirement to the the Asset. This doesn't modify existing requirements

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [add.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`AddAssetRequirementParams`](../wiki/api.procedures.types.AddAssetRequirementParams) |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

___

### arePaused

▸ **arePaused**(): `Promise`<`boolean`\>

Check whether Asset compliance requirements are paused or not

#### Returns

`Promise`<`boolean`\>

___

### checkSettle

▸ **checkSettle**(`args`): `Promise`<[`Compliance`](../wiki/types.Compliance)\>

Check whether the sender and receiver Identities in a transfer comply with all the requirements of this Asset

**`Note`**

 this does not take balances into account

**`Deprecated`**

 in favor of `settlements.canTransfer`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | - |
| `args.from?` | `string` \| [`Identity`](../wiki/api.entities.Identity.Identity) | sender Identity (optional, defaults to the signing Identity) |
| `args.to` | `string` \| [`Identity`](../wiki/api.entities.Identity.Identity) | receiver Identity |

#### Returns

`Promise`<[`Compliance`](../wiki/types.Compliance)\>

___

### get

▸ **get**(): `Promise`<[`ComplianceRequirements`](../wiki/types.ComplianceRequirements)\>

Retrieve all of the Asset's compliance requirements, together with the Default Trusted Claim Issuers

**`Note`**

 can be subscribed to

#### Returns

`Promise`<[`ComplianceRequirements`](../wiki/types.ComplianceRequirements)\>

▸ **get**(`callback`): `Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubCallback`](../wiki/types#subcallback)<[`ComplianceRequirements`](../wiki/types.ComplianceRequirements)\> |

#### Returns

`Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

___

### modify

▸ **modify**(`args`, `opts?`): `Promise`<`TransactionQueue`<`void`, `void`, `unknown`[][]\>\>

Modify a compliance requirement for the Asset

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [modify.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`ModifyComplianceRequirementParams`](../wiki/api.procedures.types#modifycompliancerequirementparams) |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<`void`, `void`, `unknown`[][]\>\>

___

### pause

▸ **pause**(`opts?`): `Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

Pause all the Asset's requirements. This means that all transfers will be allowed until requirements are unpaused

**`Note`**

 this method is of type [NoArgsProcedureMethod](../wiki/types.NoArgsProcedureMethod), which means you can call [pause.checkAuthorization](../wiki/types.NoArgsProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

___

### remove

▸ **remove**(`args`, `opts?`): `Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

Remove an existing compliance requirement from the Asset

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [remove.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`RemoveAssetRequirementParams`](../wiki/api.procedures.types.RemoveAssetRequirementParams) |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

___

### reset

▸ **reset**(`opts?`): `Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

Delete all the current requirements for the Asset.

**`Note`**

 this method is of type [NoArgsProcedureMethod](../wiki/types.NoArgsProcedureMethod), which means you can call [reset.checkAuthorization](../wiki/types.NoArgsProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

___

### set

▸ **set**(`args`, `opts?`): `Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

Configure compliance requirements for the Asset. This operation will replace all existing requirements with a new requirement set

**`Example`**

 Say A, B, C, D and E are requirements and we arrange them as `[[A, B], [C, D], [E]]`.
For a transfer to succeed, it must either comply with A AND B, C AND D, OR E.

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [set.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`SetAssetRequirementsParams`](../wiki/api.procedures.types.SetAssetRequirementsParams) |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

___

### unpause

▸ **unpause**(`opts?`): `Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>

Un-pause all the Asset's current requirements

**`Note`**

 this method is of type [NoArgsProcedureMethod](../wiki/types.NoArgsProcedureMethod), which means you can call [unpause.checkAuthorization](../wiki/types.NoArgsProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`Asset`](../wiki/api.entities.Asset.Asset), [`Asset`](../wiki/api.entities.Asset.Asset), `unknown`[][]\>\>
