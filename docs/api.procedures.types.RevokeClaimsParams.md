# Interface: RevokeClaimsParams

[api/procedures/types](../wiki/api.procedures.types).RevokeClaimsParams

## Table of contents

### Properties

- [claims](../wiki/api.procedures.types.RevokeClaimsParams#claims)
- [operation](../wiki/api.procedures.types.RevokeClaimsParams#operation)

## Properties

### claims

• **claims**: `Omit`<[`ClaimTarget`](../wiki/types.ClaimTarget), ``"expiry"``\>[]

array of claims to be revoked

#### Defined in

[api/procedures/types.ts:375](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L375)

___

### operation

• **operation**: [`Revoke`](../wiki/api.procedures.types.ClaimOperation#revoke)

#### Defined in

[api/procedures/types.ts:376](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L376)
