# Enumeration: TransactionQueueStatus

[types](../wiki/types).TransactionQueueStatus

## Table of contents

### Enumeration Members

- [Failed](../wiki/types.TransactionQueueStatus#failed)
- [Idle](../wiki/types.TransactionQueueStatus#idle)
- [Running](../wiki/types.TransactionQueueStatus#running)
- [Succeeded](../wiki/types.TransactionQueueStatus#succeeded)

## Enumeration Members

### Failed

• **Failed** = ``"Failed"``

a critical transaction's execution failed.
This might mean the transaction was rejected,
failed due to a revert or never entered a block

#### Defined in

[types/index.ts:80](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L80)

___

### Idle

• **Idle** = ``"Idle"``

the queue is prepped to run

#### Defined in

[types/index.ts:70](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L70)

___

### Running

• **Running** = ``"Running"``

transactions in the queue are being executed

#### Defined in

[types/index.ts:74](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L74)

___

### Succeeded

• **Succeeded** = ``"Succeeded"``

the queue finished running all of its transactions. Non-critical transactions
might still have failed

#### Defined in

[types/index.ts:85](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/types/index.ts#L85)
