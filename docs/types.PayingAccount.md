# Interface: PayingAccount

[types](../wiki/types).PayingAccount

Represents a relationship in which a third party Account
  is paying for a transaction on behalf of the caller

## Hierarchy

- **`PayingAccount`**

  ↳ [`ThirdPartyFees`](../wiki/types.ThirdPartyFees)

## Table of contents

### Properties

- [account](../wiki/types.PayingAccount#account)
- [allowance](../wiki/types.PayingAccount#allowance)
- [type](../wiki/types.PayingAccount#type)

## Properties

### account

• **account**: [`Account`](../wiki/api.entities.Account.Account)

Account that pays for the transaction

#### Defined in

[types/index.ts:773](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L773)

___

### allowance

• **allowance**: ``null`` \| `BigNumber`

total amount that will be paid for

#### Defined in

[types/index.ts:777](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L777)

___

### type

• **type**: [`PayingAccountType`](../wiki/types.PayingAccountType)

#### Defined in

[types/index.ts:769](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L769)
