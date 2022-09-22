import { Balance } from '@polkadot/types/interfaces';
import { Signer as PolkadotSigner } from '@polkadot/types/types';
import BigNumber from 'bignumber.js';
import { when } from 'jest-when';
import { noop } from 'lodash';

import {
  Context,
  PolymeshTransaction,
  PolymeshTransactionBase,
  PolymeshTransactionBatch,
} from '~/internal';
import { latestProcessedBlock } from '~/middleware/queries';
import { fakePromise, fakePromises } from '~/testUtils';
import { dsMockUtils, entityMockUtils } from '~/testUtils/mocks';
import { MockTxStatus } from '~/testUtils/mocks/dataSources';
import { Mocked } from '~/testUtils/types';
import { PayingAccountType, TransactionStatus, TxTags } from '~/types';
import { tuple } from '~/types/utils';
import * as utilsConversionModule from '~/utils/conversion';

describe('Polymesh Transaction Base class', () => {
  let context: Mocked<Context>;

  beforeAll(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true,
    });
    dsMockUtils.initMocks();
    entityMockUtils.initMocks();
  });

  beforeEach(() => {
    context = dsMockUtils.getContextInstance({
      balance: {
        free: new BigNumber(100000),
        locked: new BigNumber(0),
        total: new BigNumber(100000),
      },
    });
  });

  const txSpec = {
    signingAddress: 'signingAddress',
    signer: 'signer' as PolkadotSigner,
    isCritical: false,
    fee: new BigNumber(100),
  };

  afterEach(() => {
    dsMockUtils.reset();
    entityMockUtils.reset();
  });

  afterAll(() => {
    jest.useRealTimers();
    dsMockUtils.cleanup();
  });

  describe('method: toTransactionSpec', () => {
    it('should return the base tx spec of a transaction', () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('FOO');
      const resolver = (): number => 1;
      const transformer = (): number => 2;
      const paidForBy = entityMockUtils.getIdentityInstance();

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver,
          transformer,
          feeMultiplier: new BigNumber(10),
          paidForBy,
        },
        context
      );

      expect(PolymeshTransactionBase.toTransactionSpec(tx)).toEqual({
        resolver,
        transformer,
        paidForBy,
      });
    });
  });

  describe('method: run', () => {
    let getBlockStub: jest.Mock;

    beforeEach(() => {
      getBlockStub = dsMockUtils.createRpcStub('chain', 'getBlock');
      getBlockStub.mockResolvedValue(
        dsMockUtils.createMockSignedBlock({
          block: {
            header: {
              number: dsMockUtils.createMockCompact(dsMockUtils.createMockU32(new BigNumber(1))),
              parentHash: 'hash',
              stateRoot: 'hash',
              extrinsicsRoot: 'hash',
            },
            extrinsics: undefined,
          },
        })
      );
    });

    it('should execute the underlying transaction with the provided arguments, setting the tx and block hash when finished', async () => {
      const transaction = dsMockUtils.createTxStub('utility', 'batchAtomic', {
        autoResolve: false,
      });
      const underlyingTx = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('A_TICKER');

      const tx = new PolymeshTransactionBatch(
        {
          ...txSpec,
          transactions: [{ transaction: underlyingTx, args }],
          resolver: 3,
        },
        context
      );

      const runPromise = tx.run().catch(noop);

      await fakePromise();

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.InBlock);

      await fakePromise();

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.Succeeded);

      await fakePromise();

      expect(underlyingTx).toHaveBeenCalledWith(...args);
      expect(tx.blockHash).toBeDefined();
      expect(tx.blockNumber).toBeDefined();
      expect(tx.txHash).toBeDefined();
      expect(tx.txIndex).toBeDefined();
      expect(tx.status).toBe(TransactionStatus.Succeeded);

      const result = await runPromise;

      expect(result).toBe(3);
    });

    it('should update the transaction status', async () => {
      const transaction = dsMockUtils.createTxStub('utility', 'batchAtomic', {
        autoResolve: false,
      });
      const args = tuple('ANOTHER_TICKER');

      const tx = new PolymeshTransactionBatch(
        {
          ...txSpec,
          transactions: [
            { transaction: dsMockUtils.createTxStub('asset', 'registerTicker'), args },
          ],
          resolver: undefined,
        },
        context
      );

      expect(tx.status).toBe(TransactionStatus.Idle);

      tx.run().catch(noop);

      await fakePromise(2);

      expect(tx.status).toBe(TransactionStatus.Unapproved);

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.Ready);

      await fakePromise();

      expect(tx.status).toBe(TransactionStatus.Running);

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.Intermediate);

      await fakePromise();

      expect(tx.status).toBe(TransactionStatus.Running);

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.InBlock);

      await fakePromise();

      expect(tx.status).toBe(TransactionStatus.Running);

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.Succeeded);

      await fakePromise();

      expect(tx.status).toBe(TransactionStatus.Succeeded);
    });

    it('should resolve the result if it is a resolver function', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('YET_ANOTHER_TICKER');
      const resolverStub = jest.fn().mockResolvedValue(1);
      const balance = {
        free: new BigNumber(1000000),
        locked: new BigNumber(0),
        total: new BigNumber(1000000),
      };

      const subsidy = entityMockUtils.getSubsidyInstance();
      subsidy.subsidizer = entityMockUtils.getAccountInstance({
        getBalance: balance,
      });

      context = dsMockUtils.getContextInstance({
        subsidy: {
          subsidy,
          allowance: new BigNumber(10000),
        },
        balance,
      });

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: resolverStub,
        },
        context
      );

      await tx.run();

      expect(resolverStub).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if attempting to run a transaction that has already run', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('HOW_MANY_TICKERS_DO_I_NEED');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      await tx.run();

      await fakePromise();

      return expect(tx.run()).rejects.toThrow('Cannot re-run a Transaction');
    });

    it('should throw an error when the transaction is aborted', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker', {
        autoResolve: dsMockUtils.MockTxStatus.Aborted,
      });
      const args = tuple('IT_HURTS');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
          paidForBy: entityMockUtils.getIdentityInstance({
            getPrimaryAccount: {
              account: entityMockUtils.getAccountInstance({
                getBalance: {
                  free: new BigNumber(10000),
                  locked: new BigNumber(0),
                  total: new BigNumber(10000),
                },
              }),
            },
          }),
        },
        context
      );

      await expect(tx.run()).rejects.toThrow(
        'The transaction was removed from the transaction pool. This might mean that it was malformed (nonce too large/nonce too small/duplicated or invalid transaction)'
      );
      expect(tx.status).toBe(TransactionStatus.Aborted);
    });

    it('should throw an error when the transaction fails', async () => {
      let transaction = dsMockUtils.createTxStub('asset', 'registerTicker', { autoResolve: false });
      const args = tuple('PLEASE_MAKE_IT_STOP');

      let tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );
      let runPromise = tx.run();

      await fakePromise(3);

      dsMockUtils.updateTxStatus(
        transaction,
        dsMockUtils.MockTxStatus.Failed,
        dsMockUtils.TxFailReason.BadOrigin
      );

      await expect(runPromise).rejects.toThrow('Bad origin');
      expect(tx.status).toBe(TransactionStatus.Failed);

      transaction = dsMockUtils.createTxStub('asset', 'registerTicker', { autoResolve: false });
      tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );
      runPromise = tx.run();

      await fakePromise(1);

      dsMockUtils.updateTxStatus(
        transaction,
        dsMockUtils.MockTxStatus.Failed,
        dsMockUtils.TxFailReason.CannotLookup
      );

      await expect(runPromise).rejects.toThrow(
        'Could not lookup information required to validate the transaction'
      );
      expect(tx.status).toBe(TransactionStatus.Failed);

      transaction = dsMockUtils.createTxStub('asset', 'registerTicker', { autoResolve: false });
      tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );
      runPromise = tx.run();

      await fakePromise(1);

      dsMockUtils.updateTxStatus(
        transaction,
        dsMockUtils.MockTxStatus.Failed,
        dsMockUtils.TxFailReason.Other
      );

      await expect(runPromise).rejects.toThrow('Unknown error');
      expect(tx.status).toBe(TransactionStatus.Failed);

      transaction = dsMockUtils.createTxStub('asset', 'registerTicker', { autoResolve: false });
      tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );
      runPromise = tx.run();

      await fakePromise(1);

      dsMockUtils.updateTxStatus(
        transaction,
        dsMockUtils.MockTxStatus.Failed,
        dsMockUtils.TxFailReason.Module
      );

      await expect(runPromise).rejects.toThrow('someModule.SomeError: This is very bad');
      expect(tx.status).toBe(TransactionStatus.Failed);
    });

    it('should throw an error if there is a problem fetching block data', async () => {
      const message = 'Something went wrong';
      getBlockStub.mockRejectedValue(new Error(message));

      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker', {
        autoResolve: false,
      });
      const args = tuple('HERE WE ARE AGAIN');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );
      const runPromise = tx.run();

      await fakePromise(1);

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.InBlock);

      await fakePromise();

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.Succeeded);

      return expect(runPromise).rejects.toThrow(message);
    });

    it('should throw an error if there is a problem unsubscribing', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker', {
        autoResolve: false,
      });
      const args = tuple('I HATE TESTING THESE THINGS');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );
      const runPromise = tx.run();

      await fakePromise(1);

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.InBlock);

      await fakePromise();

      dsMockUtils.updateTxStatus(transaction, dsMockUtils.MockTxStatus.FailedToUnsubscribe);

      return expect(runPromise).rejects.toThrow();
    });

    it('should throw an error when the transaction is rejected', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker', {
        autoResolve: dsMockUtils.MockTxStatus.Rejected,
      });
      const args = tuple('THIS_IS_THE_LAST_ONE_I_SWEAR');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      await expect(tx.run()).rejects.toThrow('The user canceled the transaction signature');
      expect(tx.status).toBe(TransactionStatus.Rejected);
    });

    it('should throw an error if trying to run a transaction that cannot be subsidized with a subsidized Account', async () => {
      const transaction = dsMockUtils.createTxStub('staking', 'bond', {
        autoResolve: MockTxStatus.Succeeded,
      });
      const args = tuple('JUST_KIDDING');

      context = dsMockUtils.getContextInstance({
        subsidy: {
          subsidy: entityMockUtils.getSubsidyInstance(),
          allowance: new BigNumber(1000),
        },
        supportsSubsidy: false,
      });

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      await expect(tx.run()).rejects.toThrow(
        'This transaction cannot be run by a subsidized Account'
      );
      expect(tx.status).toBe(TransactionStatus.Failed);
    });

    it('should throw an error if the subsidy does not have enough allowance', async () => {
      const transaction = dsMockUtils.createTxStub('staking', 'bond', {
        autoResolve: MockTxStatus.Succeeded,
      });
      const args = tuple('JUST_KIDDING');

      context = dsMockUtils.getContextInstance({
        subsidy: {
          subsidy: entityMockUtils.getSubsidyInstance(),
          allowance: new BigNumber(10),
        },
      });

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      await expect(tx.run()).rejects.toThrow(
        "Insufficient subsidy allowance to pay this transaction's fees"
      );
      expect(tx.status).toBe(TransactionStatus.Failed);
    });

    it('should throw an error if the paying account does not have enough balance', async () => {
      const transaction = dsMockUtils.createTxStub('staking', 'bond', {
        autoResolve: MockTxStatus.Succeeded,
      });
      const args = tuple('JUST_KIDDING');

      context = dsMockUtils.getContextInstance({
        balance: {
          free: new BigNumber(0),
          locked: new BigNumber(0),
          total: new BigNumber(0),
        },
      });

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      await expect(tx.run()).rejects.toThrow(
        "The caller Account does not have enough POLYX balance to pay this transaction's fees"
      );
      expect(tx.status).toBe(TransactionStatus.Failed);
    });
  });

  describe('method: onStatusChange', () => {
    it("should execute a callback when the transaction's status changes", async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('I_HAVE_LOST_THE_WILL_TO_LIVE');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      const listenerStub = jest.fn();

      tx.onStatusChange(t => listenerStub(t.status));

      await tx.run();

      expect(listenerStub.mock.calls[0][0]).toBe(TransactionStatus.Unapproved);
      expect(listenerStub.mock.calls[1][0]).toBe(TransactionStatus.Running);
      expect(listenerStub.mock.calls[2][0]).toBe(TransactionStatus.Succeeded);
    });

    it('should return an unsubscribe function', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker', {
        autoResolve: false,
      });
      const args = tuple('THE_ONLY_THING_THAT_KEEPS_ME_GOING_IS_THE_HOPE_OF_FULL_COVERAGE');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      const listenerStub = jest.fn();

      const unsub = tx.onStatusChange(t => listenerStub(t.status));

      tx.run().catch(noop);

      await fakePromise();

      unsub();

      expect(listenerStub.mock.calls[0][0]).toBe(TransactionStatus.Unapproved);
      expect(listenerStub.mock.calls[1][0]).toBe(TransactionStatus.Running);
      expect(listenerStub).toHaveBeenCalledTimes(2);
    });
  });

  describe('method: getTotalFees', () => {
    let balanceToBigNumberStub: jest.SpyInstance<BigNumber, [Balance]>;
    let protocolFees: BigNumber[];
    let gasFees: BigNumber[];
    let rawGasFees: Balance[];

    beforeAll(() => {
      balanceToBigNumberStub = jest.spyOn(utilsConversionModule, 'balanceToBigNumber');
      protocolFees = [new BigNumber(250), new BigNumber(150)];
      gasFees = [new BigNumber(5), new BigNumber(10)];
      rawGasFees = gasFees.map(dsMockUtils.createMockBalance);
    });

    beforeEach(() => {
      when(context.getProtocolFees)
        .calledWith({ tags: [TxTags.asset.RegisterTicker] })
        .mockResolvedValue([
          {
            tag: TxTags.asset.RegisterTicker,
            fees: protocolFees[0],
          },
        ]);
      when(context.getProtocolFees)
        .calledWith({ tags: [TxTags.asset.CreateAsset] })
        .mockResolvedValue([
          {
            tag: TxTags.asset.CreateAsset,
            fees: protocolFees[1],
          },
        ]);
      rawGasFees.forEach((rawGasFee, index) =>
        when(balanceToBigNumberStub)
          .calledWith(rawGasFee)
          .mockReturnValue(new BigNumber(gasFees[index]))
      );
    });

    it('should fetch (if missing) and return transaction fees', async () => {
      const tx1 = dsMockUtils.createTxStub('asset', 'registerTicker', { gas: rawGasFees[0] });
      const tx2 = dsMockUtils.createTxStub('asset', 'createAsset', { gas: rawGasFees[1] });
      dsMockUtils.createTxStub('utility', 'batchAtomic', { gas: rawGasFees[1] });

      const args = tuple('OH_GOD_NO_IT_IS_BACK');

      let tx: PolymeshTransactionBase = new PolymeshTransaction<void>(
        {
          ...txSpec,
          transaction: tx1,
          args,
          fee: undefined,
          resolver: undefined,
        },
        context
      );

      let { fees, payingAccountData } = await tx.getTotalFees();

      expect(fees.protocol).toEqual(new BigNumber(250));
      expect(fees.gas).toEqual(new BigNumber(5));
      expect(payingAccountData.type).toBe(PayingAccountType.Caller);
      expect(payingAccountData.account.address).toBe('0xdummy');
      expect(payingAccountData.balance).toEqual(new BigNumber(100000));

      tx = new PolymeshTransaction<void>(
        {
          ...txSpec,
          transaction: tx1,
          args,
          fee: undefined,
          feeMultiplier: new BigNumber(2),
          resolver: undefined,
        },
        context
      );

      ({ fees, payingAccountData } = await tx.getTotalFees());

      expect(fees.protocol).toEqual(new BigNumber(500));
      expect(fees.gas).toEqual(new BigNumber(5));
      expect(payingAccountData.type).toBe(PayingAccountType.Caller);
      expect(payingAccountData.account.address).toBe('0xdummy');
      expect(payingAccountData.balance).toEqual(new BigNumber(100000));

      tx = new PolymeshTransaction<void>(
        {
          ...txSpec,
          fee: new BigNumber(protocolFees[1]),
          transaction: tx2,
          args,
          resolver: undefined,
        },
        context
      );

      ({ fees, payingAccountData } = await tx.getTotalFees());

      expect(fees.protocol).toEqual(new BigNumber(150));
      expect(fees.gas).toEqual(new BigNumber(10));
      expect(payingAccountData.type).toBe(PayingAccountType.Caller);
      expect(payingAccountData.account.address).toBe('0xdummy');
      expect(payingAccountData.balance).toEqual(new BigNumber(100000));

      tx = new PolymeshTransaction<void>(
        {
          ...txSpec,
          fee: new BigNumber(protocolFees[1]),
          transaction: tx2,
          args,
          resolver: undefined,
        },
        context
      );

      ({ fees, payingAccountData } = await tx.getTotalFees());

      expect(fees.protocol).toEqual(new BigNumber(150));
      expect(fees.gas).toEqual(new BigNumber(10));
      expect(payingAccountData.type).toBe(PayingAccountType.Caller);
      expect(payingAccountData.account.address).toBe('0xdummy');
      expect(payingAccountData.balance).toEqual(new BigNumber(100000));

      tx = new PolymeshTransactionBatch<void>(
        {
          ...txSpec,
          transactions: [
            {
              transaction: tx1,
              args,
            },
            {
              transaction: tx2,
              args,
            },
          ],
          resolver: undefined,
        },
        context
      );

      ({ fees, payingAccountData } = await tx.getTotalFees());

      expect(fees.protocol).toEqual(new BigNumber(400));
      expect(fees.gas).toEqual(new BigNumber(10));
      expect(payingAccountData.type).toBe(PayingAccountType.Caller);
      expect(payingAccountData.account.address).toBe('0xdummy');
      expect(payingAccountData.balance).toEqual(new BigNumber(100000));
    });
  });

  describe('method: onProcessedByMiddleware', () => {
    let blockNumber: BigNumber;

    beforeEach(() => {
      blockNumber = new BigNumber(100);
      context = dsMockUtils.getContextInstance({
        latestBlock: blockNumber,
        middlewareEnabled: true,
        balance: {
          free: new BigNumber(100000),
          locked: new BigNumber(0),
          total: new BigNumber(100000),
        },
      });
    });

    it("should execute a callback when the queue's data has been processed", async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('MAKE_IT_STOP');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      const listenerStub = jest.fn();
      tx.onProcessedByMiddleware(err => listenerStub(err));

      const stub = dsMockUtils.createApolloQueryStub(latestProcessedBlock(), {
        latestBlock: { id: blockNumber.minus(1).toNumber() },
      });

      when(stub)
        .calledWith(latestProcessedBlock())
        .mockResolvedValue({ data: { latestBlock: { id: blockNumber.toNumber() } } });

      await tx.run();

      await fakePromises();

      expect(listenerStub).toHaveBeenCalledWith(undefined);
    });

    it('should execute a callback with an error if 10 seconds pass without the data being processed', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('THE_PAIN_IS_UNBEARABLE');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      const listenerStub = jest.fn();
      tx.onProcessedByMiddleware(err => listenerStub(err));

      dsMockUtils.createApolloQueryStub(latestProcessedBlock(), {
        latestBlock: { id: blockNumber.minus(1).toNumber() },
      });

      await tx.run();

      await fakePromises();

      expect(listenerStub.mock.calls[0][0].message).toBe(
        'Middleware has not synced after 5 attempts'
      );
    });

    it('should throw an error if the middleware is not enabled', async () => {
      context.isMiddlewareEnabled = jest.fn().mockReturnValue(false);
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple('PLEASE_NO_MORE');

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      const listenerStub = jest.fn();

      await tx.run();
      expect(() => tx.onProcessedByMiddleware(err => listenerStub(err))).toThrow(
        'Cannot subscribe without an enabled middleware connection'
      );
      context.isMiddlewareEnabled.mockClear();
    });

    it('should return an unsubscribe function', async () => {
      const transaction = dsMockUtils.createTxStub('asset', 'registerTicker');
      const args = tuple("I'M_DONE");

      const tx = new PolymeshTransaction(
        {
          ...txSpec,
          transaction,
          args,
          resolver: undefined,
        },
        context
      );

      const listenerStub = jest.fn();
      const unsub = tx.onProcessedByMiddleware(err => listenerStub(err));

      dsMockUtils.createApolloQueryStub(latestProcessedBlock(), {
        latestBlock: { id: blockNumber.minus(1).toNumber() },
      });

      await tx.run();

      await fakePromises();

      unsub();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tx as any).emitter.emit('ProcessedByMiddleware');

      expect(listenerStub).toHaveBeenCalledTimes(1);
    });
  });
});
