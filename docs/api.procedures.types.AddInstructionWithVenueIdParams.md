# Interface: AddInstructionWithVenueIdParams

[api/procedures/types](../wiki/api.procedures.types).AddInstructionWithVenueIdParams

## Hierarchy

- [`AddInstructionParams`](../wiki/api.procedures.types.AddInstructionParams)

  ↳ **`AddInstructionWithVenueIdParams`**

## Table of contents

### Properties

- [endBlock](../wiki/api.procedures.types.AddInstructionWithVenueIdParams#endblock)
- [legs](../wiki/api.procedures.types.AddInstructionWithVenueIdParams#legs)
- [tradeDate](../wiki/api.procedures.types.AddInstructionWithVenueIdParams#tradedate)
- [valueDate](../wiki/api.procedures.types.AddInstructionWithVenueIdParams#valuedate)
- [venueId](../wiki/api.procedures.types.AddInstructionWithVenueIdParams#venueid)

## Properties

### endBlock

• `Optional` **endBlock**: `BigNumber`

block at which the Instruction will be executed automatically (optional, the Instruction will be executed when all participants have authorized it if not supplied)

#### Inherited from

[AddInstructionParams](../wiki/api.procedures.types.AddInstructionParams).[endBlock](../wiki/api.procedures.types.AddInstructionParams#endblock)

#### Defined in

[api/procedures/types.ts:439](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L439)

___

### legs

• **legs**: { `amount`: `BigNumber` ; `asset`: `string` \| [`Asset`](../wiki/api.entities.Asset.Asset) ; `from`: [`PortfolioLike`](../wiki/types#portfoliolike) ; `to`: [`PortfolioLike`](../wiki/types#portfoliolike)  }[]

array of Asset movements (amount, from, to, asset)

#### Inherited from

[AddInstructionParams](../wiki/api.procedures.types.AddInstructionParams).[legs](../wiki/api.procedures.types.AddInstructionParams#legs)

#### Defined in

[api/procedures/types.ts:422](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L422)

___

### tradeDate

• `Optional` **tradeDate**: `Date`

date at which the trade was agreed upon (optional, for off chain trades)

#### Inherited from

[AddInstructionParams](../wiki/api.procedures.types.AddInstructionParams).[tradeDate](../wiki/api.procedures.types.AddInstructionParams#tradedate)

#### Defined in

[api/procedures/types.ts:431](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L431)

___

### valueDate

• `Optional` **valueDate**: `Date`

date at which the trade was executed (optional, for off chain trades)

#### Inherited from

[AddInstructionParams](../wiki/api.procedures.types.AddInstructionParams).[valueDate](../wiki/api.procedures.types.AddInstructionParams#valuedate)

#### Defined in

[api/procedures/types.ts:435](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L435)

___

### venueId

• **venueId**: `BigNumber`

#### Defined in

[api/procedures/types.ts:450](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L450)
