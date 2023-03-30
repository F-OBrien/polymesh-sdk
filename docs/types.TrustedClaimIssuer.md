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

[types/index.ts:393](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L393)

___

### trustedFor

• **trustedFor**: ``null`` \| [`ClaimType`](../wiki/types.ClaimType)[]

a null value means that the issuer is trusted for all claim types

#### Defined in

[types/index.ts:397](https://github.com/PolymeshAssociation/polymesh-sdk/blob/91c2d2d8/src/types/index.ts#L397)
