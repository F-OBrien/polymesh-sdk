# Interface: CreateAssetParams

[api/procedures/types](../wiki/api.procedures.types).CreateAssetParams

## Hierarchy

- **`CreateAssetParams`**

  ↳ [`CreateAssetWithTickerParams`](../wiki/api.procedures.types.CreateAssetWithTickerParams)

## Table of contents

### Properties

- [assetType](../wiki/api.procedures.types.CreateAssetParams#assettype)
- [documents](../wiki/api.procedures.types.CreateAssetParams#documents)
- [fundingRound](../wiki/api.procedures.types.CreateAssetParams#fundinground)
- [initialStatistics](../wiki/api.procedures.types.CreateAssetParams#initialstatistics)
- [initialSupply](../wiki/api.procedures.types.CreateAssetParams#initialsupply)
- [isDivisible](../wiki/api.procedures.types.CreateAssetParams#isdivisible)
- [name](../wiki/api.procedures.types.CreateAssetParams#name)
- [requireInvestorUniqueness](../wiki/api.procedures.types.CreateAssetParams#requireinvestoruniqueness)
- [securityIdentifiers](../wiki/api.procedures.types.CreateAssetParams#securityidentifiers)

## Properties

### assetType

• **assetType**: `string`

type of security that the Asset represents (i.e. Equity, Debt, Commodity, etc). Common values are included in the
  [KnownAssetType](../wiki/types.KnownAssetType) enum, but custom values can be used as well. Custom values must be registered on-chain the first time
  they're used, requiring an additional transaction. They aren't tied to a specific Asset

#### Defined in

[api/procedures/types.ts:306](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L306)

___

### documents

• `Optional` **documents**: [`AssetDocument`](../wiki/types.AssetDocument)[]

#### Defined in

[api/procedures/types.ts:315](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L315)

___

### fundingRound

• `Optional` **fundingRound**: `string`

(optional) funding round in which the Asset currently is (Series A, Series B, etc)

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

#### Defined in

[api/procedures/types.ts:334](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L334)

___

### initialSupply

• `Optional` **initialSupply**: `BigNumber`

amount of Asset tokens that will be minted on creation (optional, default doesn't mint)

#### Defined in

[api/procedures/types.ts:296](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L296)

___

### isDivisible

• **isDivisible**: `boolean`

whether a single Asset token can be divided into decimal parts

#### Defined in

[api/procedures/types.ts:300](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L300)

___

### name

• **name**: `string`

#### Defined in

[api/procedures/types.ts:292](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L292)

___

### requireInvestorUniqueness

• **requireInvestorUniqueness**: `boolean`

whether this asset requires investors to have a Investor Uniqueness Claim in order
  to hold it. More information about Investor Uniqueness and PUIS [here](https://developers.polymesh.live/introduction/identity#polymesh-unique-identity-system-puis)

#### Defined in

[api/procedures/types.ts:320](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L320)

___

### securityIdentifiers

• `Optional` **securityIdentifiers**: [`SecurityIdentifier`](../wiki/types.SecurityIdentifier)[]

array of domestic or international alphanumeric security identifiers for the Asset (ISIN, CUSIP, FIGI, etc)

#### Defined in

[api/procedures/types.ts:310](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L310)
