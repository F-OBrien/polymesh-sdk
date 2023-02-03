# Interface: TrustedClaimIssuer<IsDefault\>

[types](../wiki/types).TrustedClaimIssuer

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `IsDefault` | extends `boolean` = ``false`` |  |

## Table of contents

### Properties

- [identity](../wiki/types.TrustedClaimIssuer#identity)
- [trustedFor](../wiki/types.TrustedClaimIssuer#trustedfor)

## Properties

### identity

• **identity**: `IsDefault` extends ``true`` ? [`DefaultTrustedClaimIssuer`](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer) : [`Identity`](../wiki/api.entities.Identity.Identity)

#### Defined in

[types/index.ts:395](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L395)

___

### trustedFor

• **trustedFor**: ``null`` \| [`ClaimType`](../wiki/types.ClaimType)[]

a null value means that the issuer is trusted for all claim types

#### Defined in

[types/index.ts:399](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L399)
