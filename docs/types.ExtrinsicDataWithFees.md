# Interface: ExtrinsicDataWithFees

[types](../wiki/types).ExtrinsicDataWithFees

## Hierarchy

- [`ExtrinsicData`](../wiki/types.ExtrinsicData)

  ↳ **`ExtrinsicDataWithFees`**

## Table of contents

### Properties

- [address](../wiki/types.ExtrinsicDataWithFees#address)
- [blockHash](../wiki/types.ExtrinsicDataWithFees#blockhash)
- [blockNumber](../wiki/types.ExtrinsicDataWithFees#blocknumber)
- [extrinsicHash](../wiki/types.ExtrinsicDataWithFees#extrinsichash)
- [extrinsicIdx](../wiki/types.ExtrinsicDataWithFees#extrinsicidx)
- [fee](../wiki/types.ExtrinsicDataWithFees#fee)
- [nonce](../wiki/types.ExtrinsicDataWithFees#nonce)
- [params](../wiki/types.ExtrinsicDataWithFees#params)
- [specVersionId](../wiki/types.ExtrinsicDataWithFees#specversionid)
- [success](../wiki/types.ExtrinsicDataWithFees#success)
- [txTag](../wiki/types.ExtrinsicDataWithFees#txtag)

## Properties

### address

• **address**: ``null`` \| `string`

public key of the signer. Unsigned transactions have no signer, in which case this value is null (example: an enacted governance proposal)

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[address](../wiki/types.ExtrinsicData#address)

#### Defined in

[types/index.ts:362](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L362)

___

### blockHash

• **blockHash**: `string`

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[blockHash](../wiki/types.ExtrinsicData#blockhash)

#### Defined in

[types/index.ts:356](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L356)

___

### blockNumber

• **blockNumber**: `BigNumber`

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[blockNumber](../wiki/types.ExtrinsicData#blocknumber)

#### Defined in

[types/index.ts:357](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L357)

___

### extrinsicHash

• **extrinsicHash**: `string`

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[extrinsicHash](../wiki/types.ExtrinsicData#extrinsichash)

#### Defined in

[types/index.ts:371](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L371)

___

### extrinsicIdx

• **extrinsicIdx**: `BigNumber`

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[extrinsicIdx](../wiki/types.ExtrinsicData#extrinsicidx)

#### Defined in

[types/index.ts:358](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L358)

___

### fee

• **fee**: [`Fees`](../wiki/types.Fees)

#### Defined in

[types/index.ts:375](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L375)

___

### nonce

• **nonce**: ``null`` \| `BigNumber`

nonce of the transaction. Null for unsigned transactions where address is null

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[nonce](../wiki/types.ExtrinsicData#nonce)

#### Defined in

[types/index.ts:366](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L366)

___

### params

• **params**: `Record`<`string`, `unknown`\>[]

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[params](../wiki/types.ExtrinsicData#params)

#### Defined in

[types/index.ts:368](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L368)

___

### specVersionId

• **specVersionId**: `BigNumber`

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[specVersionId](../wiki/types.ExtrinsicData#specversionid)

#### Defined in

[types/index.ts:370](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L370)

___

### success

• **success**: `boolean`

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[success](../wiki/types.ExtrinsicData#success)

#### Defined in

[types/index.ts:369](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L369)

___

### txTag

• **txTag**: [`TxTag`](../wiki/generated.types#txtag)

#### Inherited from

[ExtrinsicData](../wiki/types.ExtrinsicData).[txTag](../wiki/types.ExtrinsicData#txtag)

#### Defined in

[types/index.ts:367](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L367)
