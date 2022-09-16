# Interface: ConfigureDividendDistributionParams

[api/procedures/types](../wiki/api.procedures.types).ConfigureDividendDistributionParams

## Table of contents

### Properties

- [checkpoint](../wiki/api.procedures.types.ConfigureDividendDistributionParams#checkpoint)
- [currency](../wiki/api.procedures.types.ConfigureDividendDistributionParams#currency)
- [declarationDate](../wiki/api.procedures.types.ConfigureDividendDistributionParams#declarationdate)
- [defaultTaxWithholding](../wiki/api.procedures.types.ConfigureDividendDistributionParams#defaulttaxwithholding)
- [description](../wiki/api.procedures.types.ConfigureDividendDistributionParams#description)
- [expiryDate](../wiki/api.procedures.types.ConfigureDividendDistributionParams#expirydate)
- [maxAmount](../wiki/api.procedures.types.ConfigureDividendDistributionParams#maxamount)
- [originPortfolio](../wiki/api.procedures.types.ConfigureDividendDistributionParams#originportfolio)
- [paymentDate](../wiki/api.procedures.types.ConfigureDividendDistributionParams#paymentdate)
- [perShare](../wiki/api.procedures.types.ConfigureDividendDistributionParams#pershare)
- [targets](../wiki/api.procedures.types.ConfigureDividendDistributionParams#targets)
- [taxWithholdings](../wiki/api.procedures.types.ConfigureDividendDistributionParams#taxwithholdings)

## Properties

### checkpoint

• **checkpoint**: [`InputCaCheckpoint`](../wiki/api.entities.Asset.Checkpoints.types#inputcacheckpoint)

checkpoint to be used to calculate Dividends. If a Schedule is passed, the next Checkpoint it creates will be used.
  If a Date is passed, a Checkpoint will be created at that date and used

#### Defined in

[api/procedures/types.ts:643](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L643)

___

### currency

• **currency**: `string`

ticker of the currency in which Dividends will be distributed

#### Defined in

[api/procedures/types.ts:651](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L651)

___

### declarationDate

• `Optional` **declarationDate**: `Date`

date at which the issuer publicly declared the Dividend Distribution. Optional, defaults to the current date

#### Defined in

[api/procedures/types.ts:622](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L622)

___

### defaultTaxWithholding

• `Optional` **defaultTaxWithholding**: `BigNumber`

default percentage (0-100) of the Benefits to be held for tax purposes

#### Defined in

[api/procedures/types.ts:633](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L633)

___

### description

• **description**: `string`

#### Defined in

[api/procedures/types.ts:623](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L623)

___

### expiryDate

• `Optional` **expiryDate**: `Date`

optional, defaults to never expiring

#### Defined in

[api/procedures/types.ts:667](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L667)

___

### maxAmount

• **maxAmount**: `BigNumber`

maximum amount of `currency` to distribute in total

#### Defined in

[api/procedures/types.ts:659](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L659)

___

### originPortfolio

• `Optional` **originPortfolio**: `BigNumber` \| [`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio)

portfolio from which the Dividends will be distributed. Optional, defaults to the Dividend Distributions Agent's Default Portfolio

#### Defined in

[api/procedures/types.ts:647](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L647)

___

### paymentDate

• **paymentDate**: `Date`

date from which Asset Holders can claim their Dividends

#### Defined in

[api/procedures/types.ts:663](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L663)

___

### perShare

• **perShare**: `BigNumber`

amount of `currency` to distribute per each share of the Asset that a target holds

#### Defined in

[api/procedures/types.ts:655](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L655)

___

### targets

• `Optional` **targets**: [`InputCorporateActionTargets`](../wiki/types#inputcorporateactiontargets)

Asset Holder Identities to be included (or excluded) from the Dividend Distribution. Inclusion/exclusion is controlled by the `treatment`
  property. When the value is `Include`, all Asset Holders not present in the array are excluded, and vice-versa. If no value is passed,
  the default value for the Asset is used. If there is no default value, all Asset Holders will be part of the Dividend Distribution

#### Defined in

[api/procedures/types.ts:629](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L629)

___

### taxWithholdings

• `Optional` **taxWithholdings**: [`InputCorporateActionTaxWithholdings`](../wiki/types#inputcorporateactiontaxwithholdings)

percentage (0-100) of the Benefits to be held for tax purposes from individual Asset Holder Identities.
  This overrides the value of `defaultTaxWithholding`

#### Defined in

[api/procedures/types.ts:638](https://github.com/PolymeshAssociation/polymesh-sdk/blob/339b7503/src/api/procedures/types.ts#L638)
