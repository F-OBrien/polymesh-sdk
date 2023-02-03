# Interface: CheckRolesResult

[types](../wiki/types).CheckRolesResult

Result of a `checkRoles` call

## Table of contents

### Properties

- [message](../wiki/types.CheckRolesResult#message)
- [missingRoles](../wiki/types.CheckRolesResult#missingroles)
- [result](../wiki/types.CheckRolesResult#result)

## Properties

### message

• `Optional` **message**: `string`

optional message explaining the reason for failure in special cases

#### Defined in

[types/index.ts:1023](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1023)

___

### missingRoles

• `Optional` **missingRoles**: [`Role`](../wiki/types#role)[]

required roles which the Identity *DOESN'T* have. Only present if `result` is `false`

#### Defined in

[types/index.ts:1015](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1015)

___

### result

• **result**: `boolean`

whether the signer possesses all the required roles or not

#### Defined in

[types/index.ts:1019](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1019)
