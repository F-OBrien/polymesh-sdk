# Interface: InviteExternalAgentParams

[api/procedures/types](../wiki/api.procedures.types).InviteExternalAgentParams

## Table of contents

### Properties

- [expiry](../wiki/api.procedures.types.InviteExternalAgentParams#expiry)
- [permissions](../wiki/api.procedures.types.InviteExternalAgentParams#permissions)
- [target](../wiki/api.procedures.types.InviteExternalAgentParams#target)

## Properties

### expiry

• `Optional` **expiry**: `Date`

date at which the authorization request for invitation expires (optional)

**`Note`**

 if expiry date is not set, the invitation will never expire

**`Note`**

 due to chain limitations, the expiry will be ignored if the passed `permissions` don't correspond to an existing Permission Group

#### Defined in

[api/procedures/types.ts:762](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L762)

___

### permissions

• **permissions**: [`CustomPermissionGroup`](../wiki/api.entities.CustomPermissionGroup.CustomPermissionGroup) \| [`KnownPermissionGroup`](../wiki/api.entities.KnownPermissionGroup.KnownPermissionGroup) \| { `transactions`: ``null`` \| [`TransactionPermissions`](../wiki/types.TransactionPermissions)  } \| { `transactionGroups`: [`TxGroup`](../wiki/types.TxGroup)[]  }

#### Defined in

[api/procedures/types.ts:747](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L747)

___

### target

• **target**: `string` \| [`Identity`](../wiki/api.entities.Identity.Identity)

#### Defined in

[api/procedures/types.ts:746](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/procedures/types.ts#L746)
