# Interface: HumanReadable

[api/entities/DividendDistribution](../wiki/api.entities.DividendDistribution).HumanReadable

## Hierarchy

- [`HumanReadable`](../wiki/api.entities.CorporateAction.HumanReadable)

  ↳ **`HumanReadable`**

## Table of contents

### Properties

- [currency](../wiki/api.entities.DividendDistribution.HumanReadable#currency)
- [declarationDate](../wiki/api.entities.DividendDistribution.HumanReadable#declarationdate)
- [defaultTaxWithholding](../wiki/api.entities.DividendDistribution.HumanReadable#defaulttaxwithholding)
- [description](../wiki/api.entities.DividendDistribution.HumanReadable#description)
- [expiryDate](../wiki/api.entities.DividendDistribution.HumanReadable#expirydate)
- [id](../wiki/api.entities.DividendDistribution.HumanReadable#id)
- [maxAmount](../wiki/api.entities.DividendDistribution.HumanReadable#maxamount)
- [origin](../wiki/api.entities.DividendDistribution.HumanReadable#origin)
- [paymentDate](../wiki/api.entities.DividendDistribution.HumanReadable#paymentdate)
- [perShare](../wiki/api.entities.DividendDistribution.HumanReadable#pershare)
- [targets](../wiki/api.entities.DividendDistribution.HumanReadable#targets)
- [taxWithholdings](../wiki/api.entities.DividendDistribution.HumanReadable#taxwithholdings)
- [ticker](../wiki/api.entities.DividendDistribution.HumanReadable#ticker)

## Properties

### currency

• **currency**: `string`

#### Defined in

[api/entities/DividendDistribution/index.ts:76](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/DividendDistribution/index.ts#L76)

___

### declarationDate

• **declarationDate**: `string`

#### Inherited from

[HumanReadable](../wiki/api.entities.CorporateAction.HumanReadable).[declarationDate](../wiki/api.entities.CorporateAction.HumanReadable#declarationdate)

#### Defined in

[api/entities/CorporateAction.ts:24](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/CorporateAction.ts#L24)

___

### defaultTaxWithholding

• **defaultTaxWithholding**: `string`

#### Inherited from

[HumanReadable](../wiki/api.entities.CorporateAction.HumanReadable).[defaultTaxWithholding](../wiki/api.entities.CorporateAction.HumanReadable#defaulttaxwithholding)

#### Defined in

[api/entities/CorporateAction.ts:27](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/CorporateAction.ts#L27)

___

### description

• **description**: `string`

#### Inherited from

[HumanReadable](../wiki/api.entities.CorporateAction.HumanReadable).[description](../wiki/api.entities.CorporateAction.HumanReadable#description)

#### Defined in

[api/entities/CorporateAction.ts:25](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/CorporateAction.ts#L25)

___

### expiryDate

• **expiryDate**: ``null`` \| `string`

#### Defined in

[api/entities/DividendDistribution/index.ts:79](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/DividendDistribution/index.ts#L79)

___

### id

• **id**: `string`

#### Inherited from

[HumanReadable](../wiki/api.entities.CorporateAction.HumanReadable).[id](../wiki/api.entities.CorporateAction.HumanReadable#id)

#### Defined in

[api/entities/CorporateAction.ts:22](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/CorporateAction.ts#L22)

___

### maxAmount

• **maxAmount**: `string`

#### Defined in

[api/entities/DividendDistribution/index.ts:78](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/DividendDistribution/index.ts#L78)

___

### origin

• **origin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `id?` | `string` |

#### Defined in

[api/entities/DividendDistribution/index.ts:75](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/DividendDistribution/index.ts#L75)

___

### paymentDate

• **paymentDate**: `string`

#### Defined in

[api/entities/DividendDistribution/index.ts:80](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/DividendDistribution/index.ts#L80)

___

### perShare

• **perShare**: `string`

#### Defined in

[api/entities/DividendDistribution/index.ts:77](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/DividendDistribution/index.ts#L77)

___

### targets

• **targets**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `identities` | `string`[] |
| `treatment` | [`TargetTreatment`](../wiki/api.entities.CorporateActionBase.types.TargetTreatment) |

#### Inherited from

[HumanReadable](../wiki/api.entities.CorporateAction.HumanReadable).[targets](../wiki/api.entities.CorporateAction.HumanReadable#targets)

#### Defined in

[api/entities/CorporateAction.ts:26](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/CorporateAction.ts#L26)

___

### taxWithholdings

• **taxWithholdings**: { `identity`: `string` ; `percentage`: `string`  }[]

#### Inherited from

[HumanReadable](../wiki/api.entities.CorporateAction.HumanReadable).[taxWithholdings](../wiki/api.entities.CorporateAction.HumanReadable#taxwithholdings)

#### Defined in

[api/entities/CorporateAction.ts:28](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/CorporateAction.ts#L28)

___

### ticker

• **ticker**: `string`

#### Inherited from

[HumanReadable](../wiki/api.entities.CorporateAction.HumanReadable).[ticker](../wiki/api.entities.CorporateAction.HumanReadable#ticker)

#### Defined in

[api/entities/CorporateAction.ts:23](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/CorporateAction.ts#L23)
