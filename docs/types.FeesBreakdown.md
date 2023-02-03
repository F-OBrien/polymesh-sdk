# Interface: FeesBreakdown

[types](../wiki/types).FeesBreakdown

Breakdown of transaction fees for a Transaction Queue. In most cases, the entirety of the Queue's fees
  will be paid by either the signing Account or a third party. In some rare cases,
  fees can be split between them (for example, if the signing Account is being subsidized, but one of the
  transactions in the queue terminates the subsidy, leaving the signing Account with the responsibility of
  paying for the rest of the transactions)

## Table of contents

### Properties

- [accountBalance](../wiki/types.FeesBreakdown#accountbalance)
- [accountFees](../wiki/types.FeesBreakdown#accountfees)
- [thirdPartyFees](../wiki/types.FeesBreakdown#thirdpartyfees)

## Properties

### accountBalance

• **accountBalance**: `BigNumber`

free balance of the caller Account

#### Defined in

[types/index.ts:814](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L814)

___

### accountFees

• **accountFees**: [`Fees`](../wiki/types.Fees)

fees that must be paid by the caller Account

#### Defined in

[types/index.ts:810](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L810)

___

### thirdPartyFees

• **thirdPartyFees**: [`ThirdPartyFees`](../wiki/types.ThirdPartyFees)[]

fees that will be paid by third parties. Each element in the array represents
  a different third party Account, their corresponding fees, allowances and balance

#### Defined in

[types/index.ts:806](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L806)
