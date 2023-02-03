# Interface: TransactionsParams

[api/procedures/types](../wiki/api.procedures.types).TransactionsParams

## Hierarchy

- [`AssetBase`](../wiki/api.procedures.types.AssetBase)

  ↳ **`TransactionsParams`**

## Table of contents

### Properties

- [asset](../wiki/api.procedures.types.TransactionsParams#asset)
- [transactions](../wiki/api.procedures.types.TransactionsParams#transactions)

## Properties

### asset

• **asset**: `string` \| [`Asset`](../wiki/api.entities.Asset.Asset)

Asset over which the Identity will be granted permissions

#### Inherited from

[AssetBase](../wiki/api.procedures.types.AssetBase).[asset](../wiki/api.procedures.types.AssetBase#asset)

#### Defined in

[api/procedures/types.ts:890](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L890)

___

### transactions

• **transactions**: ``null`` \| [`TransactionPermissions`](../wiki/types.TransactionPermissions)

a null value means full permissions

#### Defined in

[api/procedures/types.ts:897](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L897)
