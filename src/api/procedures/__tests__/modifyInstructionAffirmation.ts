import { u32, u64 } from '@polkadot/types';
import BigNumber from 'bignumber.js';
import { when } from 'jest-when';
import {
  AffirmationStatus as MeshAffirmationStatus,
  PortfolioId as MeshPortfolioId,
} from 'polymesh-types/types';

import {
  getAuthorization,
  prepareModifyInstructionAffirmation,
  prepareStorage,
  Storage,
} from '~/api/procedures/modifyInstructionAffirmation';
import * as procedureUtilsModule from '~/api/procedures/utils';
import { Context, DefaultPortfolio, Instruction } from '~/internal';
import { dsMockUtils, entityMockUtils, procedureMockUtils } from '~/testUtils/mocks';
import { Mocked } from '~/testUtils/types';
import {
  AffirmationStatus,
  InstructionAffirmationOperation,
  ModifyInstructionAffirmationParams,
  PortfolioId,
  PortfolioLike,
  TxTags,
} from '~/types';
import * as utilsConversionModule from '~/utils/conversion';

jest.mock(
  '~/api/entities/Instruction',
  require('~/testUtils/mocks/entities').mockInstructionModule('~/api/entities/Instruction')
);
jest.mock(
  '~/api/entities/DefaultPortfolio',
  require('~/testUtils/mocks/entities').mockDefaultPortfolioModule(
    '~/api/entities/DefaultPortfolio'
  )
);

describe('modifyInstructionAffirmation procedure', () => {
  const id = new BigNumber(1);
  const rawInstructionId = dsMockUtils.createMockU64(new BigNumber(1));
  const rawPortfolioId = dsMockUtils.createMockPortfolioId({
    did: dsMockUtils.createMockIdentityId('someDid'),
    kind: dsMockUtils.createMockPortfolioKind('Default'),
  });
  const did = 'someDid';
  let portfolio: DefaultPortfolio;
  let legAmount: BigNumber;
  let rawLegAmount: u32;
  const portfolioId: PortfolioId = { did };
  const latestBlock = new BigNumber(100);
  let mockContext: Mocked<Context>;
  let bigNumberToU64Stub: jest.SpyInstance<u64, [BigNumber, Context]>;
  let bigNumberToU32Stub: jest.SpyInstance<u32, [BigNumber, Context]>;
  let portfolioLikeToPortfolioIdStub: jest.SpyInstance<PortfolioId, [PortfolioLike]>;
  let portfolioIdToMeshPortfolioIdStub: jest.SpyInstance<MeshPortfolioId, [PortfolioId, Context]>;
  let meshAffirmationStatusToAffirmationStatusStub: jest.SpyInstance<
    AffirmationStatus,
    [MeshAffirmationStatus]
  >;

  beforeAll(() => {
    dsMockUtils.initMocks({
      contextOptions: {
        latestBlock,
      },
    });
    procedureMockUtils.initMocks();
    entityMockUtils.initMocks();

    portfolio = entityMockUtils.getDefaultPortfolioInstance({ did: 'someDid ' });
    legAmount = new BigNumber(2);
    bigNumberToU64Stub = jest.spyOn(utilsConversionModule, 'bigNumberToU64');
    bigNumberToU32Stub = jest.spyOn(utilsConversionModule, 'bigNumberToU32');
    portfolioLikeToPortfolioIdStub = jest.spyOn(
      utilsConversionModule,
      'portfolioLikeToPortfolioId'
    );
    portfolioIdToMeshPortfolioIdStub = jest.spyOn(
      utilsConversionModule,
      'portfolioIdToMeshPortfolioId'
    );
    meshAffirmationStatusToAffirmationStatusStub = jest.spyOn(
      utilsConversionModule,
      'meshAffirmationStatusToAffirmationStatus'
    );

    jest.spyOn(procedureUtilsModule, 'assertInstructionValid').mockImplementation();
  });

  beforeEach(() => {
    rawLegAmount = dsMockUtils.createMockU32(new BigNumber(2));
    dsMockUtils.createTxStub('settlement', 'affirmInstruction');
    dsMockUtils.createTxStub('settlement', 'withdrawAffirmation');
    dsMockUtils.createTxStub('settlement', 'rejectInstruction');
    mockContext = dsMockUtils.getContextInstance();
    bigNumberToU64Stub.mockReturnValue(rawInstructionId);
    bigNumberToU32Stub.mockReturnValue(rawLegAmount);
    when(portfolioLikeToPortfolioIdStub).calledWith(portfolio).mockReturnValue(portfolioId);
    when(portfolioIdToMeshPortfolioIdStub)
      .calledWith(portfolioId, mockContext)
      .mockReturnValue(rawPortfolioId);
  });

  afterEach(() => {
    entityMockUtils.reset();
    procedureMockUtils.reset();
    dsMockUtils.reset();
  });

  afterAll(() => {
    procedureMockUtils.cleanup();
    dsMockUtils.cleanup();
  });

  it('should throw an error if the signing Identity is not the custodian of any of the involved portfolios', () => {
    const rawAffirmationStatus = dsMockUtils.createMockAffirmationStatus('Affirmed');
    dsMockUtils.createQueryStub('settlement', 'userAffirmations', {
      multi: [rawAffirmationStatus, rawAffirmationStatus],
    });
    when(meshAffirmationStatusToAffirmationStatusStub)
      .calledWith(rawAffirmationStatus)
      .mockReturnValue(AffirmationStatus.Affirmed);

    const proc = procedureMockUtils.getInstance<
      ModifyInstructionAffirmationParams,
      Instruction,
      Storage
    >(mockContext, {
      portfolios: [],
      senderLegAmount: legAmount,
      totalLegAmount: legAmount,
    });

    return expect(
      prepareModifyInstructionAffirmation.call(proc, {
        id,
        operation: InstructionAffirmationOperation.Affirm,
      })
    ).rejects.toThrow('The signing Identity is not involved in this Instruction');
  });

  it("should throw an error if the operation is Affirm and all of the signing Identity's Portfolios are affirmed", () => {
    const rawAffirmationStatus = dsMockUtils.createMockAffirmationStatus('Affirmed');
    dsMockUtils.createQueryStub('settlement', 'userAffirmations', {
      multi: [rawAffirmationStatus, rawAffirmationStatus],
    });
    when(meshAffirmationStatusToAffirmationStatusStub)
      .calledWith(rawAffirmationStatus)
      .mockReturnValue(AffirmationStatus.Affirmed);

    const proc = procedureMockUtils.getInstance<
      ModifyInstructionAffirmationParams,
      Instruction,
      Storage
    >(mockContext, {
      portfolios: [portfolio, portfolio],
      senderLegAmount: legAmount,
      totalLegAmount: legAmount,
    });

    return expect(
      prepareModifyInstructionAffirmation.call(proc, {
        id,
        operation: InstructionAffirmationOperation.Affirm,
      })
    ).rejects.toThrow('The Instruction is already affirmed');
  });

  it('should return an affirm instruction transaction spec', async () => {
    const rawAffirmationStatus = dsMockUtils.createMockAffirmationStatus('Pending');
    dsMockUtils.createQueryStub('settlement', 'userAffirmations', {
      multi: [rawAffirmationStatus, rawAffirmationStatus],
    });
    when(meshAffirmationStatusToAffirmationStatusStub)
      .calledWith(rawAffirmationStatus)
      .mockReturnValue(AffirmationStatus.Pending);

    const proc = procedureMockUtils.getInstance<
      ModifyInstructionAffirmationParams,
      Instruction,
      Storage
    >(mockContext, {
      portfolios: [portfolio, portfolio],
      senderLegAmount: legAmount,
      totalLegAmount: legAmount,
    });

    const transaction = dsMockUtils.createTxStub('settlement', 'affirmInstruction');

    const result = await prepareModifyInstructionAffirmation.call(proc, {
      id,
      operation: InstructionAffirmationOperation.Affirm,
    });

    expect(result).toEqual({
      transaction,
      feeMultiplier: new BigNumber(2),
      args: [rawInstructionId, [rawPortfolioId, rawPortfolioId], rawLegAmount],
      resolver: expect.objectContaining({ id }),
    });
  });

  it('should throw an error if operation is Withdraw and the current status of the instruction is pending', () => {
    const rawAffirmationStatus = dsMockUtils.createMockAffirmationStatus('Pending');
    dsMockUtils.createQueryStub('settlement', 'userAffirmations', {
      multi: [rawAffirmationStatus, rawAffirmationStatus],
    });
    when(meshAffirmationStatusToAffirmationStatusStub)
      .calledWith(rawAffirmationStatus)
      .mockReturnValue(AffirmationStatus.Pending);

    const proc = procedureMockUtils.getInstance<
      ModifyInstructionAffirmationParams,
      Instruction,
      Storage
    >(mockContext, {
      portfolios: [portfolio, portfolio],
      senderLegAmount: legAmount,
      totalLegAmount: legAmount,
    });

    return expect(
      prepareModifyInstructionAffirmation.call(proc, {
        id,
        operation: InstructionAffirmationOperation.Withdraw,
      })
    ).rejects.toThrow('The instruction is not affirmed');
  });

  it('should return a withdraw instruction transaction spec', async () => {
    const rawAffirmationStatus = dsMockUtils.createMockAffirmationStatus('Affirmed');
    dsMockUtils.createQueryStub('settlement', 'userAffirmations', {
      multi: [rawAffirmationStatus, rawAffirmationStatus],
    });
    when(meshAffirmationStatusToAffirmationStatusStub)
      .calledWith(rawAffirmationStatus)
      .mockReturnValue(AffirmationStatus.Affirmed);

    const proc = procedureMockUtils.getInstance<
      ModifyInstructionAffirmationParams,
      Instruction,
      Storage
    >(mockContext, {
      portfolios: [portfolio, portfolio],
      senderLegAmount: legAmount,
      totalLegAmount: legAmount,
    });

    const transaction = dsMockUtils.createTxStub('settlement', 'withdrawAffirmation');

    const result = await prepareModifyInstructionAffirmation.call(proc, {
      id,
      operation: InstructionAffirmationOperation.Withdraw,
    });

    expect(result).toEqual({
      transaction,
      feeMultiplier: new BigNumber(2),
      args: [rawInstructionId, [rawPortfolioId, rawPortfolioId], rawLegAmount],
      resolver: expect.objectContaining({ id }),
    });
  });

  it('should return a reject instruction transaction spec', async () => {
    const rawAffirmationStatus = dsMockUtils.createMockAffirmationStatus('Pending');
    dsMockUtils.createQueryStub('settlement', 'userAffirmations', {
      multi: [rawAffirmationStatus, rawAffirmationStatus],
    });
    when(meshAffirmationStatusToAffirmationStatusStub)
      .calledWith(rawAffirmationStatus)
      .mockReturnValue(AffirmationStatus.Pending);

    const isCustodiedByStub = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValue(false);

    entityMockUtils.configureMocks({
      defaultPortfolioOptions: {
        isCustodiedBy: isCustodiedByStub,
      },
    });

    const proc = procedureMockUtils.getInstance<
      ModifyInstructionAffirmationParams,
      Instruction,
      Storage
    >(mockContext, {
      portfolios: [portfolio, portfolio],
      senderLegAmount: legAmount,
      totalLegAmount: legAmount,
    });

    const transaction = dsMockUtils.createTxStub('settlement', 'rejectInstruction');

    const result = await prepareModifyInstructionAffirmation.call(proc, {
      id,
      operation: InstructionAffirmationOperation.Reject,
    });

    expect(result).toEqual({
      transaction,
      feeMultiplier: new BigNumber(2),
      args: [rawInstructionId, rawPortfolioId, rawLegAmount],
      resolver: expect.objectContaining({ id }),
    });
  });

  describe('getAuthorization', () => {
    it('should return the appropriate roles and permissions', async () => {
      const args = {
        id: new BigNumber(1),
        operation: InstructionAffirmationOperation.Affirm,
      };
      const from = entityMockUtils.getNumberedPortfolioInstance();
      const to = entityMockUtils.getDefaultPortfolioInstance();

      let proc = procedureMockUtils.getInstance<
        ModifyInstructionAffirmationParams,
        Instruction,
        Storage
      >(mockContext, {
        portfolios: [from, to],
        senderLegAmount: legAmount,
        totalLegAmount: legAmount,
      });
      let boundFunc = getAuthorization.bind(proc);

      let result = await boundFunc(args);

      expect(result).toEqual({
        permissions: {
          assets: [],
          portfolios: [from, to],
          transactions: [TxTags.settlement.AffirmInstruction],
        },
      });

      proc = procedureMockUtils.getInstance<
        ModifyInstructionAffirmationParams,
        Instruction,
        Storage
      >(mockContext, {
        portfolios: [],
        senderLegAmount: legAmount,
        totalLegAmount: legAmount,
      });

      boundFunc = getAuthorization.bind(proc);

      result = await boundFunc({ ...args, operation: InstructionAffirmationOperation.Reject });

      expect(result).toEqual({
        permissions: {
          assets: [],
          portfolios: [],
          transactions: [TxTags.settlement.RejectInstruction],
        },
      });

      result = await boundFunc({ ...args, operation: InstructionAffirmationOperation.Withdraw });

      expect(result).toEqual({
        permissions: {
          assets: [],
          portfolios: [],
          transactions: [TxTags.settlement.WithdrawAffirmation],
        },
      });
    });
  });

  describe('prepareStorage', () => {
    const fromDid = 'fromDid';
    const toDid = 'toDid';

    let from = entityMockUtils.getDefaultPortfolioInstance({ did: fromDid, isCustodiedBy: true });
    let to = entityMockUtils.getDefaultPortfolioInstance({ did: toDid, isCustodiedBy: true });
    const amount = new BigNumber(1);
    const asset = entityMockUtils.getAssetInstance({ ticker: 'SOME_ASSET' });

    it('should return the portfolios for which to modify affirmation status', async () => {
      const proc = procedureMockUtils.getInstance<
        ModifyInstructionAffirmationParams,
        Instruction,
        Storage
      >(mockContext);

      const boundFunc = prepareStorage.bind(proc);
      entityMockUtils.configureMocks({
        instructionOptions: {
          getLegs: { data: [{ from, to, amount, asset }], next: null },
        },
      });
      const result = await boundFunc({
        id: new BigNumber(1),
        operation: InstructionAffirmationOperation.Affirm,
      });

      expect(result).toEqual({
        portfolios: [
          expect.objectContaining({ owner: expect.objectContaining({ did: fromDid }) }),
          expect.objectContaining({ owner: expect.objectContaining({ did: toDid }) }),
        ],
        senderLegAmount: new BigNumber(1),
        totalLegAmount: new BigNumber(1),
      });
    });

    it('should return the portfolios  for which to modify affirmation status when there is no sender legs', async () => {
      const proc = procedureMockUtils.getInstance<
        ModifyInstructionAffirmationParams,
        Instruction,
        Storage
      >(mockContext);

      const boundFunc = prepareStorage.bind(proc);
      from = entityMockUtils.getDefaultPortfolioInstance({ did: fromDid, isCustodiedBy: false });
      to = entityMockUtils.getDefaultPortfolioInstance({ did: toDid, isCustodiedBy: false });

      entityMockUtils.configureMocks({
        instructionOptions: {
          getLegs: { data: [{ from, to, amount, asset }], next: null },
        },
      });

      const result = await boundFunc({
        id: new BigNumber(1),
        operation: InstructionAffirmationOperation.Affirm,
      });

      expect(result).toEqual({
        portfolios: [],
        senderLegAmount: new BigNumber(0),
        totalLegAmount: new BigNumber(1),
      });
    });
  });
});
