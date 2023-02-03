# Interface: TransferBreakdown

[api/entities/Asset/types](../wiki/api.entities.Asset.types).TransferBreakdown

Object containing every reason why a specific Asset transfer would fail

## Table of contents

### Properties

- [compliance](../wiki/api.entities.Asset.types.TransferBreakdown#compliance)
- [general](../wiki/api.entities.Asset.types.TransferBreakdown#general)
- [restrictions](../wiki/api.entities.Asset.types.TransferBreakdown#restrictions)
- [result](../wiki/api.entities.Asset.types.TransferBreakdown#result)

## Properties

### compliance

• **compliance**: [`Compliance`](../wiki/types.Compliance)

how the transfer adheres to the asset's compliance rules

#### Defined in

[api/entities/Asset/types.ts:44](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Asset/types.ts#L44)

___

### general

• **general**: [`TransferError`](../wiki/types.TransferError)[]

list of general transfer errors

#### Defined in

[api/entities/Asset/types.ts:40](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Asset/types.ts#L40)

___

### restrictions

• **restrictions**: [`TransferRestrictionResult`](../wiki/api.entities.Asset.types.TransferRestrictionResult)[]

list of transfer restrictions and whether the transfer satisfies each one

#### Defined in

[api/entities/Asset/types.ts:48](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Asset/types.ts#L48)

___

### result

• **result**: `boolean`

true if the transfer is possible

#### Defined in

[api/entities/Asset/types.ts:52](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Asset/types.ts#L52)
