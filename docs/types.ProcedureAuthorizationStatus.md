# Interface: ProcedureAuthorizationStatus

[types](../wiki/types).ProcedureAuthorizationStatus

## Table of contents

### Properties

- [accountFrozen](../wiki/types.ProcedureAuthorizationStatus#accountfrozen)
- [agentPermissions](../wiki/types.ProcedureAuthorizationStatus#agentpermissions)
- [noIdentity](../wiki/types.ProcedureAuthorizationStatus#noidentity)
- [roles](../wiki/types.ProcedureAuthorizationStatus#roles)
- [signerPermissions](../wiki/types.ProcedureAuthorizationStatus#signerpermissions)

## Properties

### accountFrozen

• **accountFrozen**: `boolean`

whether the Account is frozen (i.e. can't perform any transactions)

#### Defined in

[types/index.ts:1261](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1261)

___

### agentPermissions

• **agentPermissions**: [`CheckPermissionsResult`](../wiki/types.CheckPermissionsResult)<[`Identity`](../wiki/types.SignerType#identity)\>

whether the Identity complies with all required Agent permissions

#### Defined in

[types/index.ts:1249](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1249)

___

### noIdentity

• **noIdentity**: `boolean`

true only if the Procedure requires an Identity but the signing Account
  doesn't have one associated

#### Defined in

[types/index.ts:1266](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1266)

___

### roles

• **roles**: [`CheckRolesResult`](../wiki/types.CheckRolesResult)

whether the Identity complies with all required Roles

#### Defined in

[types/index.ts:1257](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1257)

___

### signerPermissions

• **signerPermissions**: [`CheckPermissionsResult`](../wiki/types.CheckPermissionsResult)<[`Account`](../wiki/types.SignerType#account)\>

whether the Account complies with all required Signer permissions

#### Defined in

[types/index.ts:1253](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L1253)
