# Interface: ClaimCountTransferRestriction

[types](../wiki/types).ClaimCountTransferRestriction

## Hierarchy

- `TransferRestrictionBase`

  ↳ **`ClaimCountTransferRestriction`**

## Table of contents

### Properties

- [claim](../wiki/types.ClaimCountTransferRestriction#claim)
- [exemptedIds](../wiki/types.ClaimCountTransferRestriction#exemptedids)
- [issuer](../wiki/types.ClaimCountTransferRestriction#issuer)
- [max](../wiki/types.ClaimCountTransferRestriction#max)
- [min](../wiki/types.ClaimCountTransferRestriction#min)

## Properties

### claim

• **claim**: [`InputStatClaim`](../wiki/types#inputstatclaim)

The type of investors this restriction applies to. e.g. non-accredited

#### Defined in

[types/index.ts:1294](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1294)

___

### exemptedIds

• `Optional` **exemptedIds**: `string`[]

array of Scope/Identity IDs that are exempted from the Restriction

**`Note`**

 if the Asset requires investor uniqueness, Scope IDs are used. Otherwise, we use Identity IDs. More on Scope IDs and investor uniqueness
  [here](https://developers.polymesh.network/introduction/identity#polymesh-unique-identity-system-puis) and
  [here](https://developers.polymesh.network/polymesh-docs/primitives/confidential-identity)

#### Inherited from

TransferRestrictionBase.exemptedIds

#### Defined in

[types/index.ts:1277](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1277)

___

### issuer

• **issuer**: [`Identity`](../wiki/api.entities.Identity.Identity)

#### Defined in

[types/index.ts:1304](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1304)

___

### max

• `Optional` **max**: `BigNumber`

The maximum amount of investors that must meet the Claim criteria

#### Defined in

[types/index.ts:1302](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1302)

___

### min

• **min**: `BigNumber`

The minimum amount of investors the must meet the Claim criteria

#### Defined in

[types/index.ts:1298](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1298)
