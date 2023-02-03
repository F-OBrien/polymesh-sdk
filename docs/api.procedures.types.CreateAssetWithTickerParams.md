# Interface: CreateAssetWithTickerParams

[api/procedures/types](../wiki/api.procedures.types).CreateAssetWithTickerParams

## Hierarchy

- [`CreateAssetParams`](../wiki/api.procedures.types.CreateAssetParams)

  ↳ **`CreateAssetWithTickerParams`**

## Table of contents

### Properties

- [assetType](../wiki/api.procedures.types.CreateAssetWithTickerParams#assettype)
- [documents](../wiki/api.procedures.types.CreateAssetWithTickerParams#documents)
- [fundingRound](../wiki/api.procedures.types.CreateAssetWithTickerParams#fundinground)
- [initialStatistics](../wiki/api.procedures.types.CreateAssetWithTickerParams#initialstatistics)
- [initialSupply](../wiki/api.procedures.types.CreateAssetWithTickerParams#initialsupply)
- [isDivisible](../wiki/api.procedures.types.CreateAssetWithTickerParams#isdivisible)
- [name](../wiki/api.procedures.types.CreateAssetWithTickerParams#name)
- [requireInvestorUniqueness](../wiki/api.procedures.types.CreateAssetWithTickerParams#requireinvestoruniqueness)
- [securityIdentifiers](../wiki/api.procedures.types.CreateAssetWithTickerParams#securityidentifiers)
- [ticker](../wiki/api.procedures.types.CreateAssetWithTickerParams#ticker)

## Properties

### assetType

• **assetType**: `string`

type of security that the Asset represents (i.e. Equity, Debt, Commodity, etc). Common values are included in the
  [KnownAssetType](../wiki/types.KnownAssetType) enum, but custom values can be used as well. Custom values must be registered on-chain the first time
  they're used, requiring an additional transaction. They aren't tied to a specific Asset

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[assetType](../wiki/api.procedures.types.CreateAssetParams#assettype)

#### Defined in

[api/procedures/types.ts:306](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L306)

___

### documents

• `Optional` **documents**: [`AssetDocument`](../wiki/types.AssetDocument)[]

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[documents](../wiki/api.procedures.types.CreateAssetParams#documents)

#### Defined in

[api/procedures/types.ts:315](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L315)

___

### fundingRound

• `Optional` **fundingRound**: `string`

(optional) funding round in which the Asset currently is (Series A, Series B, etc)

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[fundingRound](../wiki/api.procedures.types.CreateAssetParams#fundinground)

#### Defined in

[api/procedures/types.ts:314](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L314)

___

### initialStatistics

• `Optional` **initialStatistics**: [`InputStatType`](../wiki/types#inputstattype)[]

(optional) type of statistics that should be enabled for the Asset

Enabling statistics allows for TransferRestrictions to be made. For example the SEC requires registration for a company that
has either more than 2000 investors, or more than 500 non accredited investors. To prevent crossing this limit two restrictions are
needed, a `Count` of 2000, and a `ScopedCount` of non accredited with a maximum of 500. [source](https://www.sec.gov/info/smallbus/secg/jobs-act-section-12g-small-business-compliance-guide.htm)

These restrictions require a `Count` and `ScopedCount` statistic to be created. Although they an be created after the Asset is made, it is recommended to create statistics
before the Asset is circulated. Count statistics made after Asset creation need their initial value set, so it is simpler to create them before investors hold the Asset.
If you do need to create a stat for an Asset after creation, you can use the [enableStat](../wiki/api.entities.Asset.TransferRestrictions.TransferRestrictionBase.TransferRestrictionBase#enablestat) method in
the appropriate namespace

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[initialStatistics](../wiki/api.procedures.types.CreateAssetParams#initialstatistics)

#### Defined in

[api/procedures/types.ts:334](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L334)

___

### initialSupply

• `Optional` **initialSupply**: `BigNumber`

amount of Asset tokens that will be minted on creation (optional, default doesn't mint)

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[initialSupply](../wiki/api.procedures.types.CreateAssetParams#initialsupply)

#### Defined in

[api/procedures/types.ts:296](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L296)

___

### isDivisible

• **isDivisible**: `boolean`

whether a single Asset token can be divided into decimal parts

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[isDivisible](../wiki/api.procedures.types.CreateAssetParams#isdivisible)

#### Defined in

[api/procedures/types.ts:300](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L300)

___

### name

• **name**: `string`

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[name](../wiki/api.procedures.types.CreateAssetParams#name)

#### Defined in

[api/procedures/types.ts:292](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L292)

___

### requireInvestorUniqueness

• **requireInvestorUniqueness**: `boolean`

whether this asset requires investors to have a Investor Uniqueness Claim in order
  to hold it. More information about Investor Uniqueness and PUIS [here](https://developers.polymesh.live/introduction/identity#polymesh-unique-identity-system-puis)

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[requireInvestorUniqueness](../wiki/api.procedures.types.CreateAssetParams#requireinvestoruniqueness)

#### Defined in

[api/procedures/types.ts:320](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L320)

___

### securityIdentifiers

• `Optional` **securityIdentifiers**: [`SecurityIdentifier`](../wiki/types.SecurityIdentifier)[]

array of domestic or international alphanumeric security identifiers for the Asset (ISIN, CUSIP, FIGI, etc)

#### Inherited from

[CreateAssetParams](../wiki/api.procedures.types.CreateAssetParams).[securityIdentifiers](../wiki/api.procedures.types.CreateAssetParams#securityidentifiers)

#### Defined in

[api/procedures/types.ts:310](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L310)

___

### ticker

• **ticker**: `string`

#### Defined in

[api/procedures/types.ts:338](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L338)
