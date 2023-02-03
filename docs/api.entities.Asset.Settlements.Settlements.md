# Class: Settlements

[api/entities/Asset/Settlements](../wiki/api.entities.Asset.Settlements).Settlements

Handles all Asset Settlements related functionality

## Hierarchy

- `Namespace`<[`Asset`](../wiki/api.entities.Asset.Asset)\>

  ↳ **`Settlements`**

## Table of contents

### Methods

- [canSettle](../wiki/api.entities.Asset.Settlements.Settlements#cansettle)
- [canTransfer](../wiki/api.entities.Asset.Settlements.Settlements#cantransfer)

## Methods

### canSettle

▸ **canSettle**(`args`): `Promise`<[`TransferStatus`](../wiki/types.TransferStatus)\>

Check whether it is possible to create a settlement Instruction to transfer a certain amount of this Asset's tokens between two Portfolios.

**`Note`**

 this takes locked tokens into account. For example, if portfolio A has 1000 tokens and this function is called to check if 700 of them can be
  transferred to portfolio B (assuming everything else checks out) the result will be success. If an instruction is created and authorized to transfer those 700 tokens,
  they would become locked. From that point, further calls to this function would yield failed results because of the funds being locked, even though they haven't been
  transferred yet

**`Deprecated`**

 in favor of [canTransfer](../wiki/api.entities.Asset.Settlements.Settlements#cantransfer)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | - |
| `args.amount` | `BigNumber` | amount of tokens to transfer |
| `args.from?` | [`PortfolioLike`](../wiki/types#portfoliolike) | sender Portfolio (optional, defaults to the signing Identity's Default Portfolio) |
| `args.to` | [`PortfolioLike`](../wiki/types#portfoliolike) | receiver Portfolio |

#### Returns

`Promise`<[`TransferStatus`](../wiki/types.TransferStatus)\>

___

### canTransfer

▸ **canTransfer**(`args`): `Promise`<[`TransferBreakdown`](../wiki/api.entities.Asset.types.TransferBreakdown)\>

Check whether it is possible to create a settlement instruction to transfer a certain amount of this asset between two Portfolios. Returns a breakdown of
  the transaction containing general errors (such as insufficient balance or invalid receiver), any broken transfer restrictions, and any compliance
  failures

**`Note`**

 this takes locked tokens into account. For example, if portfolio A has 1000 tokens and this function is called to check if 700 of them can be
  transferred to portfolio B (assuming everything else checks out) the result will be success. If an instruction is created and authorized to transfer those 700 tokens,
  they would become locked. From that point, further calls to this function would yield failed results because of the funds being locked, even though they haven't been
  transferred yet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `Object` | - |
| `args.amount` | `BigNumber` | amount of tokens to transfer |
| `args.from?` | [`PortfolioLike`](../wiki/types#portfoliolike) | sender Portfolio (optional, defaults to the signing Identity's Default Portfolio) |
| `args.to` | [`PortfolioLike`](../wiki/types#portfoliolike) | receiver Portfolio |

#### Returns

`Promise`<[`TransferBreakdown`](../wiki/api.entities.Asset.types.TransferBreakdown)\>
