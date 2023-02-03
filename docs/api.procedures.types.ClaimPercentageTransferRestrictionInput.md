# Interface: ClaimPercentageTransferRestrictionInput

[api/procedures/types](../wiki/api.procedures.types).ClaimPercentageTransferRestrictionInput

## Hierarchy

- `TransferRestrictionInputBase`

  ↳ **`ClaimPercentageTransferRestrictionInput`**

## Table of contents

### Properties

- [claim](../wiki/api.procedures.types.ClaimPercentageTransferRestrictionInput#claim)
- [exemptedIdentities](../wiki/api.procedures.types.ClaimPercentageTransferRestrictionInput#exemptedidentities)
- [issuer](../wiki/api.procedures.types.ClaimPercentageTransferRestrictionInput#issuer)
- [max](../wiki/api.procedures.types.ClaimPercentageTransferRestrictionInput#max)
- [min](../wiki/api.procedures.types.ClaimPercentageTransferRestrictionInput#min)

## Properties

### claim

• **claim**: [`InputStatClaim`](../wiki/types#inputstatclaim)

#### Defined in

[api/procedures/types.ts:204](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L204)

___

### exemptedIdentities

• `Optional` **exemptedIdentities**: (`string` \| [`Identity`](../wiki/api.entities.Identity.Identity))[]

array of Identities (or DIDs) that are exempted from the Restriction

#### Inherited from

TransferRestrictionInputBase.exemptedIdentities

#### Defined in

[api/procedures/types.ts:177](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L177)

___

### issuer

• **issuer**: [`Identity`](../wiki/api.entities.Identity.Identity)

#### Defined in

[api/procedures/types.ts:203](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L203)

___

### max

• **max**: `BigNumber`

#### Defined in

[api/procedures/types.ts:202](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L202)

___

### min

• **min**: `BigNumber`

#### Defined in

[api/procedures/types.ts:201](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L201)
