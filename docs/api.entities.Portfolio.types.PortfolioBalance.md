# Interface: PortfolioBalance

[api/entities/Portfolio/types](../wiki/api.entities.Portfolio.types).PortfolioBalance

## Hierarchy

- [`Balance`](../wiki/types.Balance)

  ↳ **`PortfolioBalance`**

## Table of contents

### Properties

- [asset](../wiki/api.entities.Portfolio.types.PortfolioBalance#asset)
- [free](../wiki/api.entities.Portfolio.types.PortfolioBalance#free)
- [locked](../wiki/api.entities.Portfolio.types.PortfolioBalance#locked)
- [total](../wiki/api.entities.Portfolio.types.PortfolioBalance#total)

## Properties

### asset

• **asset**: [`Asset`](../wiki/api.entities.Asset.Asset)

#### Defined in

[api/entities/Portfolio/types.ts:11](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/api/entities/Portfolio/types.ts#L11)

___

### free

• **free**: `BigNumber`

balance available for transferring and paying fees

#### Inherited from

[Balance](../wiki/types.Balance).[free](../wiki/types.Balance#free)

#### Defined in

[types/index.ts:704](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L704)

___

### locked

• **locked**: `BigNumber`

unavailable balance, either bonded for staking or locked for some other purpose

#### Inherited from

[Balance](../wiki/types.Balance).[locked](../wiki/types.Balance#locked)

#### Defined in

[types/index.ts:708](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L708)

___

### total

• **total**: `BigNumber`

free + locked

#### Inherited from

[Balance](../wiki/types.Balance).[total](../wiki/types.Balance#total)

#### Defined in

[types/index.ts:712](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L712)
