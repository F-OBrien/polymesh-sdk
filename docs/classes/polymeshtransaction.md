# Class: PolymeshTransaction ‹**Args, Values**›

Wrapper class for a Polymesh Transaction

## Type parameters

▪ **Args**: *unknown[]*

▪ **Values**: *unknown[]*

## Hierarchy

* [PolymeshTransactionBase](polymeshtransactionbase.md)‹Args, Values›

  ↳ **PolymeshTransaction**

## Index

### Properties

* [blockHash](polymeshtransaction.md#optional-blockhash)
* [context](polymeshtransaction.md#protected-context)
* [error](polymeshtransaction.md#optional-error)
* [inputArgs](polymeshtransaction.md#inputargs)
* [isCritical](polymeshtransaction.md#iscritical)
* [receipt](polymeshtransaction.md#optional-receipt)
* [status](polymeshtransaction.md#status)
* [tag](polymeshtransaction.md#tag)
* [txHash](polymeshtransaction.md#optional-txhash)

### Accessors

* [args](polymeshtransaction.md#args)

### Methods

* [getFees](polymeshtransaction.md#getfees)
* [getPayingAccount](polymeshtransaction.md#getpayingaccount)
* [onStatusChange](polymeshtransaction.md#onstatuschange)
* [run](polymeshtransaction.md#run)

## Properties

### `Optional` blockHash

• **blockHash**? : *undefined | string*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[blockHash](polymeshtransactionbase.md#optional-blockhash)*

*Defined in [src/base/PolymeshTransactionBase.ts:50](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L50)*

hash of the block where this transaction resides (status: `Succeeded`, `Failed`)

___

### `Protected` context

• **context**: *[Context](context.md)*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[context](polymeshtransactionbase.md#protected-context)*

*Defined in [src/base/PolymeshTransactionBase.ts:113](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L113)*

___

### `Optional` error

• **error**? : *[PolymeshError](polymesherror.md)*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[error](polymeshtransactionbase.md#optional-error)*

*Defined in [src/base/PolymeshTransactionBase.ts:35](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L35)*

stores errors thrown while running the transaction (status: `Failed`, `Aborted`)

___

###  inputArgs

• **inputArgs**: *MapMaybePostTransactionValue‹Args›*

*Defined in [src/base/PolymeshTransaction.ts:26](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransaction.ts#L26)*

arguments for the transaction. Available after the transaction starts running
(may be Post Transaction Values from a previous transaction in the queue that haven't resolved yet)

___

###  isCritical

• **isCritical**: *boolean*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[isCritical](polymeshtransactionbase.md#iscritical)*

*Defined in [src/base/PolymeshTransactionBase.ts:55](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L55)*

whether this transaction failing makes the entire transaction queue fail or not

___

### `Optional` receipt

• **receipt**? : *ISubmittableResult*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[receipt](polymeshtransactionbase.md#optional-receipt)*

*Defined in [src/base/PolymeshTransactionBase.ts:40](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L40)*

stores the transaction receipt (if successful)

___

###  status

• **status**: *[TransactionStatus](../enums/transactionstatus.md)* = TransactionStatus.Idle

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[status](polymeshtransactionbase.md#status)*

*Defined in [src/base/PolymeshTransactionBase.ts:30](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L30)*

current status of the transaction

___

###  tag

• **tag**: *TxTag*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[tag](polymeshtransactionbase.md#tag)*

*Defined in [src/base/PolymeshTransactionBase.ts:60](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L60)*

type of transaction represented by this instance (mostly for display purposes)

___

### `Optional` txHash

• **txHash**? : *undefined | string*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[txHash](polymeshtransactionbase.md#optional-txhash)*

*Defined in [src/base/PolymeshTransactionBase.ts:45](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L45)*

transaction hash (status: `Running`, `Succeeded`, `Failed`)

## Accessors

###  args

• **get args**(): *Args*

*Defined in [src/base/PolymeshTransaction.ts:43](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransaction.ts#L43)*

Arguments for the transaction

**Returns:** *Args*

## Methods

###  getFees

▸ **getFees**(): *Promise‹[Fees](../interfaces/fees.md) | null›*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[getFees](polymeshtransactionbase.md#getfees)*

*Defined in [src/base/PolymeshTransactionBase.ts:306](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L306)*

Get all (protocol and gas) fees associated with this transaction. Returns null
if the transaction is not ready yet (this can happen if it depends on the execution of a
previous transaction in the queue)

**`note`** this value might change if the transaction is run at a later time. This can be due to a governance vote

**Returns:** *Promise‹[Fees](../interfaces/fees.md) | null›*

___

###  getPayingAccount

▸ **getPayingAccount**(): *Promise‹object | null›*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[getPayingAccount](polymeshtransactionbase.md#getpayingaccount)*

*Defined in [src/base/PolymeshTransactionBase.ts:269](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L269)*

Retrieve the Account that would pay for the transaction fees if it was run at this moment, as well as the maximum amount that can be
  charged to it. A null allowance means that there is no limit to that amount

A null return value signifies that the current Account will pay for the fees

**`note`** this value might change if, before running the transaction, the current Account enters (or leaves)
  a subsidizer relationship

**Returns:** *Promise‹object | null›*

___

###  onStatusChange

▸ **onStatusChange**(`listener`: function): *function*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[onStatusChange](polymeshtransactionbase.md#onstatuschange)*

*Defined in [src/base/PolymeshTransactionBase.ts:252](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L252)*

Subscribe to status changes

**Parameters:**

▪ **listener**: *function*

callback function that will be called whenever the status changes

▸ (`transaction`: this): *void*

**Parameters:**

Name | Type |
------ | ------ |
`transaction` | this |

**Returns:** *function*

unsubscribe function

▸ (): *void*

___

###  run

▸ **run**(): *Promise‹void›*

*Inherited from [PolymeshTransactionBase](polymeshtransactionbase.md).[run](polymeshtransactionbase.md#run)*

*Defined in [src/base/PolymeshTransactionBase.ts:139](https://github.com/PolymathNetwork/polymesh-sdk/blob/108d588b/src/base/PolymeshTransactionBase.ts#L139)*

Run the transaction and update its status

**Returns:** *Promise‹void›*
