# Interface: AddInstructionParams

[api/procedures/types](../wiki/api.procedures.types).AddInstructionParams

## Hierarchy

- **`AddInstructionParams`**

  ↳ [`AddInstructionWithVenueIdParams`](../wiki/api.procedures.types.AddInstructionWithVenueIdParams)

## Table of contents

### Properties

- [endBlock](../wiki/api.procedures.types.AddInstructionParams#endblock)
- [legs](../wiki/api.procedures.types.AddInstructionParams#legs)
- [tradeDate](../wiki/api.procedures.types.AddInstructionParams#tradedate)
- [valueDate](../wiki/api.procedures.types.AddInstructionParams#valuedate)

## Properties

### endBlock

• `Optional` **endBlock**: `BigNumber`

block at which the Instruction will be executed automatically (optional, the Instruction will be executed when all participants have authorized it if not supplied)

#### Defined in

[api/procedures/types.ts:439](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L439)

___

### legs

• **legs**: { `amount`: `BigNumber` ; `asset`: `string` \| [`Asset`](../wiki/api.entities.Asset.Asset) ; `from`: [`PortfolioLike`](../wiki/types#portfoliolike) ; `to`: [`PortfolioLike`](../wiki/types#portfoliolike)  }[]

array of Asset movements (amount, from, to, asset)

#### Defined in

[api/procedures/types.ts:422](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L422)

___

### tradeDate

• `Optional` **tradeDate**: `Date`

date at which the trade was agreed upon (optional, for off chain trades)

#### Defined in

[api/procedures/types.ts:431](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L431)

___

### valueDate

• `Optional` **valueDate**: `Date`

date at which the trade was executed (optional, for off chain trades)

#### Defined in

[api/procedures/types.ts:435](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L435)
