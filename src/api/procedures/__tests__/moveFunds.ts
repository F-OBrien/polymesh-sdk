import {
  PalletPortfolioMovePortfolioItem,
  PolymeshPrimitivesIdentityIdPortfolioId,
} from '@polkadot/types/lookup';
import BigNumber from 'bignumber.js';
import { when } from 'jest-when';

import { getAuthorization, Params, prepareMoveFunds } from '~/api/procedures/moveFunds';
import * as procedureUtilsModule from '~/api/procedures/utils';
import { Context, DefaultPortfolio, NumberedPortfolio } from '~/internal';
import { dsMockUtils, entityMockUtils, procedureMockUtils } from '~/testUtils/mocks';
import { Mocked } from '~/testUtils/types';
import { PortfolioBalance, PortfolioId, PortfolioMovement, RoleType, TxTags } from '~/types';
import * as utilsConversionModule from '~/utils/conversion';

jest.mock(
  '~/api/entities/NumberedPortfolio',
  require('~/testUtils/mocks/entities').mockNumberedPortfolioModule(
    '~/api/entities/NumberedPortfolio'
  )
);

jest.mock(
  '~/api/entities/DefaultPortfolio',
  require('~/testUtils/mocks/entities').mockDefaultPortfolioModule(
    '~/api/entities/DefaultPortfolio'
  )
);

describe('moveFunds procedure', () => {
  let mockContext: Mocked<Context>;
  let portfolioIdToMeshPortfolioIdSpy: jest.SpyInstance<
    PolymeshPrimitivesIdentityIdPortfolioId,
    [PortfolioId, Context]
  >;
  let portfolioMovementToMovePortfolioItemSpy: jest.SpyInstance<
    PalletPortfolioMovePortfolioItem,
    [PortfolioMovement, Context]
  >;
  let portfolioLikeToPortfolioIdSpy: jest.SpyInstance;
  let assertPortfolioExistsSpy: jest.SpyInstance;

  beforeAll(() => {
    dsMockUtils.initMocks();
    procedureMockUtils.initMocks();
    entityMockUtils.initMocks();
    portfolioIdToMeshPortfolioIdSpy = jest.spyOn(
      utilsConversionModule,
      'portfolioIdToMeshPortfolioId'
    );
    portfolioMovementToMovePortfolioItemSpy = jest.spyOn(
      utilsConversionModule,
      'portfolioMovementToMovePortfolioItem'
    );
    portfolioLikeToPortfolioIdSpy = jest.spyOn(utilsConversionModule, 'portfolioLikeToPortfolioId');
    assertPortfolioExistsSpy = jest.spyOn(procedureUtilsModule, 'assertPortfolioExists');
  });

  beforeEach(() => {
    mockContext = dsMockUtils.getContextInstance();
    entityMockUtils.configureMocks({
      numberedPortfolioOptions: {
        isOwnedBy: true,
      },
    });
    assertPortfolioExistsSpy.mockReturnValue(true);
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

  it('should throw an error if both portfolios do not have the same owner', () => {
    const fromId = new BigNumber(1);
    const fromDid = 'someDid';
    const toId = new BigNumber(2);
    const toDid = 'otherDid';
    const fromPortfolio = new NumberedPortfolio({ id: fromId, did: fromDid }, mockContext);
    const toPortfolio = entityMockUtils.getNumberedPortfolioInstance({
      id: toId,
      did: toDid,
    });
    const proc = procedureMockUtils.getInstance<Params, void>(mockContext);

    when(portfolioLikeToPortfolioIdSpy)
      .calledWith(fromPortfolio)
      .mockReturnValue({ did: fromDid, number: toId });
    when(portfolioLikeToPortfolioIdSpy)
      .calledWith(toPortfolio)
      .mockReturnValue({ did: toDid, number: toId });

    return expect(
      prepareMoveFunds.call(proc, {
        from: fromPortfolio,
        to: toPortfolio,
        items: [],
      })
    ).rejects.toThrow('Both portfolios should have the same owner');
  });

  it('should throw an error if both portfolios are the same', () => {
    const id = new BigNumber(1);
    const did = 'someDid';
    const samePortfolio = new NumberedPortfolio({ id, did }, mockContext);
    const proc = procedureMockUtils.getInstance<Params, void>(mockContext);
    const fakePortfolioId = { did, number: id };

    when(portfolioLikeToPortfolioIdSpy).calledWith(samePortfolio).mockReturnValue(fakePortfolioId);
    when(portfolioLikeToPortfolioIdSpy).calledWith(samePortfolio).mockReturnValue(fakePortfolioId);

    return expect(
      prepareMoveFunds.call(proc, {
        from: samePortfolio,
        to: samePortfolio,
        items: [],
      })
    ).rejects.toThrow('Origin and destination should be different Portfolios');
  });

  it('should throw an error if an Asset is specified more than once', () => {
    const fromId = new BigNumber(1);
    const fromDid = 'someDid';
    const id = new BigNumber(1);
    const did = 'someDid';
    const toPortfolio = new NumberedPortfolio({ id, did }, mockContext);
    const fromPortfolio = new NumberedPortfolio({ id: fromId, did: fromDid }, mockContext);
    const proc = procedureMockUtils.getInstance<Params, void>(mockContext);
    const toPortfolioId = { did, number: id };

    when(portfolioLikeToPortfolioIdSpy).calledWith(toPortfolio).mockReturnValue(toPortfolioId);
    when(portfolioLikeToPortfolioIdSpy).calledWith(toPortfolio).mockReturnValue(fromId);

    return expect(
      prepareMoveFunds.call(proc, {
        from: fromPortfolio,
        to: toPortfolio,
        items: [
          { asset: 'TICKER', amount: new BigNumber(10) },
          { asset: 'TICKER', amount: new BigNumber(20) },
        ],
      })
    ).rejects.toThrow('Portfolio movements cannot contain any Asset more than once');
  });

  it('should throw an error if some of the amount Asset to move exceeds its balance', async () => {
    const fromId = new BigNumber(1);
    const toId = new BigNumber(2);
    const did = 'someDid';
    const asset1 = entityMockUtils.getAssetInstance({ ticker: 'TICKER001' });
    const asset2 = entityMockUtils.getAssetInstance({ ticker: 'TICKER002' });
    const items: PortfolioMovement[] = [
      {
        asset: asset1.ticker,
        amount: new BigNumber(100),
      },
      {
        asset: asset2,
        amount: new BigNumber(20),
      },
    ];

    entityMockUtils.configureMocks({
      numberedPortfolioOptions: {
        getAssetBalances: [
          { asset: asset1, free: new BigNumber(50) },
          { asset: asset2, free: new BigNumber(10) },
        ] as unknown as PortfolioBalance[],
      },
    });

    const from = entityMockUtils.getNumberedPortfolioInstance({ id: fromId, did });
    const to = entityMockUtils.getNumberedPortfolioInstance({ id: toId, did });

    when(portfolioLikeToPortfolioIdSpy).calledWith(from).mockReturnValue({ did, number: fromId });
    when(portfolioLikeToPortfolioIdSpy).calledWith(to).mockReturnValue({ did, number: toId });

    const proc = procedureMockUtils.getInstance<Params, void>(mockContext);

    let error;

    try {
      await prepareMoveFunds.call(proc, {
        from,
        to,
        items,
      });
    } catch (err) {
      error = err;
    }

    expect(error.message).toBe(
      "Some of the amounts being transferred exceed the Portfolio's balance"
    );
    expect(error.data.balanceExceeded).toMatchObject(items);
  });

  it('should return a move portfolio funds transaction spec', async () => {
    const fromId = new BigNumber(1);
    const toId = new BigNumber(2);
    const did = 'someDid';
    const asset = entityMockUtils.getAssetInstance({ ticker: 'TICKER001' });
    const items = [
      {
        asset: asset.ticker,
        amount: new BigNumber(100),
      },
    ];

    entityMockUtils.configureMocks({
      numberedPortfolioOptions: {
        did,
        getAssetBalances: [{ asset, total: new BigNumber(150) }] as unknown as PortfolioBalance[],
      },
      defaultPortfolioOptions: {
        did,
        getAssetBalances: [{ asset, total: new BigNumber(150) }] as unknown as PortfolioBalance[],
      },
    });

    const from = entityMockUtils.getNumberedPortfolioInstance({ id: fromId, did });
    const to = entityMockUtils.getNumberedPortfolioInstance({ id: toId, did });

    let fromPortfolioId: { did: string; number?: BigNumber } = { did, number: fromId };
    let toPortfolioId: { did: string; number?: BigNumber } = { did, number: toId };

    when(portfolioLikeToPortfolioIdSpy).calledWith(from).mockReturnValue(fromPortfolioId);
    when(portfolioLikeToPortfolioIdSpy).calledWith(to).mockReturnValue(toPortfolioId);
    when(portfolioLikeToPortfolioIdSpy)
      .calledWith(expect.objectContaining({ owner: expect.objectContaining({ did }), id: toId }))
      .mockReturnValue(toPortfolioId);

    let rawFromMeshPortfolioId = dsMockUtils.createMockPortfolioId({
      did: dsMockUtils.createMockIdentityId(did),
      kind: dsMockUtils.createMockPortfolioKind({
        User: dsMockUtils.createMockU64(fromId),
      }),
    });
    when(portfolioIdToMeshPortfolioIdSpy)
      .calledWith(fromPortfolioId, mockContext)
      .mockReturnValue(rawFromMeshPortfolioId);

    let rawToMeshPortfolioId = dsMockUtils.createMockPortfolioId({
      did: dsMockUtils.createMockIdentityId(did),
      kind: dsMockUtils.createMockPortfolioKind({
        User: dsMockUtils.createMockU64(toId),
      }),
    });
    when(portfolioIdToMeshPortfolioIdSpy)
      .calledWith(toPortfolioId, mockContext)
      .mockReturnValue(rawToMeshPortfolioId);

    const rawMovePortfolioItem = dsMockUtils.createMockMovePortfolioItem({
      ticker: dsMockUtils.createMockTicker(items[0].asset),
      amount: dsMockUtils.createMockBalance(items[0].amount),
    });
    when(portfolioMovementToMovePortfolioItemSpy)
      .calledWith(items[0], mockContext)
      .mockReturnValue(rawMovePortfolioItem);

    const proc = procedureMockUtils.getInstance<Params, void>(mockContext);

    const transaction = dsMockUtils.createTxMock('portfolio', 'movePortfolioFunds');

    let result = await prepareMoveFunds.call(proc, {
      from,
      to: toId,
      items,
    });

    expect(result).toEqual({
      transaction,
      args: [rawFromMeshPortfolioId, rawToMeshPortfolioId, [rawMovePortfolioItem]],
      resolver: undefined,
    });

    toPortfolioId = { did };

    when(portfolioLikeToPortfolioIdSpy)
      .calledWith(
        expect.objectContaining({ owner: expect.objectContaining({ did }), id: undefined })
      )
      .mockReturnValue(toPortfolioId);

    rawToMeshPortfolioId = dsMockUtils.createMockPortfolioId({
      did: dsMockUtils.createMockIdentityId(did),
      kind: dsMockUtils.createMockPortfolioKind('Default'),
    });
    when(portfolioIdToMeshPortfolioIdSpy)
      .calledWith(toPortfolioId, mockContext)
      .mockReturnValue(rawToMeshPortfolioId);

    result = await prepareMoveFunds.call(proc, {
      from,
      items,
    });

    expect(result).toEqual({
      transaction,
      args: [rawFromMeshPortfolioId, rawToMeshPortfolioId, [rawMovePortfolioItem]],
      resolver: undefined,
    });

    const defaultFrom = entityMockUtils.getDefaultPortfolioInstance({ did });

    fromPortfolioId = { did };
    toPortfolioId = { did, number: toId };

    when(portfolioLikeToPortfolioIdSpy).calledWith(defaultFrom).mockReturnValue(fromPortfolioId);
    when(portfolioLikeToPortfolioIdSpy).calledWith(to).mockReturnValue(toPortfolioId);

    rawFromMeshPortfolioId = dsMockUtils.createMockPortfolioId({
      did: dsMockUtils.createMockIdentityId(did),
      kind: dsMockUtils.createMockPortfolioKind('Default'),
    });
    when(portfolioIdToMeshPortfolioIdSpy)
      .calledWith(fromPortfolioId, mockContext)
      .mockReturnValue(rawFromMeshPortfolioId);

    rawToMeshPortfolioId = dsMockUtils.createMockPortfolioId({
      did: dsMockUtils.createMockIdentityId(did),
      kind: dsMockUtils.createMockPortfolioKind({
        User: dsMockUtils.createMockU64(toId),
      }),
    });
    when(portfolioIdToMeshPortfolioIdSpy)
      .calledWith(toPortfolioId, mockContext)
      .mockReturnValue(rawToMeshPortfolioId);

    result = await prepareMoveFunds.call(proc, {
      from: defaultFrom,
      to,
      items,
    });

    expect(result).toEqual({
      transaction,
      args: [rawFromMeshPortfolioId, rawToMeshPortfolioId, [rawMovePortfolioItem]],
      resolver: undefined,
    });
  });

  describe('getAuthorization', () => {
    it('should return the appropriate roles and permissions', () => {
      const proc = procedureMockUtils.getInstance<Params, void>(mockContext);
      const boundFunc = getAuthorization.bind(proc);
      const fromId = new BigNumber(1);
      const toId = new BigNumber(10);
      const did = 'someDid';
      let from: DefaultPortfolio | NumberedPortfolio = entityMockUtils.getNumberedPortfolioInstance(
        { did, id: fromId }
      );
      const to = entityMockUtils.getNumberedPortfolioInstance({ did, id: toId });

      let args = {
        from,
      } as unknown as Params;

      let portfolioId: PortfolioId = { did, number: fromId };

      expect(boundFunc(args)).toEqual({
        roles: [{ type: RoleType.PortfolioCustodian, portfolioId }],
        permissions: {
          transactions: [TxTags.portfolio.MovePortfolioFunds],
          portfolios: [
            expect.objectContaining({ owner: expect.objectContaining({ did }), id: fromId }),
            expect.objectContaining({ owner: expect.objectContaining({ did }) }),
          ],
          assets: [],
        },
      });

      from = entityMockUtils.getDefaultPortfolioInstance({ did });

      args = {
        from,
        to: toId,
      } as unknown as Params;

      portfolioId = { did };

      expect(boundFunc(args)).toEqual({
        roles: [{ type: RoleType.PortfolioCustodian, portfolioId }],
        permissions: {
          transactions: [TxTags.portfolio.MovePortfolioFunds],
          portfolios: [
            expect.objectContaining({ owner: expect.objectContaining({ did }) }),
            expect.objectContaining({ owner: expect.objectContaining({ did }), id: toId }),
          ],
          assets: [],
        },
      });

      args = {
        from,
        to,
      } as unknown as Params;

      portfolioId = { did };

      expect(boundFunc(args)).toEqual({
        roles: [{ type: RoleType.PortfolioCustodian, portfolioId }],
        permissions: {
          transactions: [TxTags.portfolio.MovePortfolioFunds],
          portfolios: [
            expect.objectContaining({ owner: expect.objectContaining({ did }) }),
            expect.objectContaining({ owner: expect.objectContaining({ did }), id: toId }),
          ],
          assets: [],
        },
      });
    });
  });
});
