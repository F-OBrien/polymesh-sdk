import BigNumber from 'bignumber.js';
import { when } from 'jest-when';

import { Context, Entity, NumberedPortfolio, PolymeshError, PolymeshTransaction } from '~/internal';
import { eventByIndexedArgs } from '~/middleware/queries';
import { portfolioQuery } from '~/middleware/queriesV2';
import { EventIdEnum, ModuleIdEnum } from '~/middleware/types';
import { dsMockUtils, entityMockUtils, procedureMockUtils } from '~/testUtils/mocks';
import { ErrorCode, EventIdentifier } from '~/types';
import * as utilsConversionModule from '~/utils/conversion';

jest.mock(
  '~/api/entities/Identity',
  require('~/testUtils/mocks/entities').mockIdentityModule('~/api/entities/Identity')
);
jest.mock(
  '~/base/Procedure',
  require('~/testUtils/mocks/procedure').mockProcedureModule('~/base/Procedure')
);

describe('NumberedPortfolio class', () => {
  let context: Context;

  beforeAll(() => {
    dsMockUtils.initMocks();
    entityMockUtils.initMocks();
    procedureMockUtils.initMocks();
  });

  beforeEach(() => {
    context = dsMockUtils.getContextInstance();
  });

  afterEach(() => {
    dsMockUtils.reset();
    entityMockUtils.reset();
    procedureMockUtils.reset();
  });

  afterAll(() => {
    dsMockUtils.cleanup();
    procedureMockUtils.cleanup();
  });

  it('should extend Entity', () => {
    expect(NumberedPortfolio.prototype instanceof Entity).toBe(true);
  });

  describe('constructor', () => {
    it('should assign Identity and id to instance', () => {
      const did = 'someDid';
      const id = new BigNumber(1);
      const portfolio = new NumberedPortfolio({ did, id }, context);

      expect(portfolio.owner.did).toBe(did);
      expect(portfolio.id).toEqual(id);
    });
  });

  describe('method: isUniqueIdentifiers', () => {
    it('should return true if the object conforms to the interface', () => {
      expect(NumberedPortfolio.isUniqueIdentifiers({ did: 'someDid', id: new BigNumber(1) })).toBe(
        true
      );
      expect(NumberedPortfolio.isUniqueIdentifiers({ did: 'someDid' })).toBe(false);
      expect(NumberedPortfolio.isUniqueIdentifiers({})).toBe(false);
      expect(NumberedPortfolio.isUniqueIdentifiers({ did: 'someDid', id: 3 })).toBe(false);
      expect(NumberedPortfolio.isUniqueIdentifiers({ did: 1, id: new BigNumber(1) })).toBe(false);
    });
  });

  describe('method: modifyName', () => {
    it('should prepare the procedure and return the resulting transaction', async () => {
      const id = new BigNumber(1);
      const did = 'someDid';
      const name = 'newName';
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);
      const expectedTransaction =
        'someTransaction' as unknown as PolymeshTransaction<NumberedPortfolio>;

      when(procedureMockUtils.getPrepareMock())
        .calledWith({ args: { id, did, name }, transformer: undefined }, context, {})
        .mockResolvedValue(expectedTransaction);

      const tx = await numberedPortfolio.modifyName({ name });

      expect(tx).toBe(expectedTransaction);
    });
  });

  describe('method: getName', () => {
    const id = new BigNumber(1);
    const did = 'someDid';
    const portfolioName = 'someName';
    it('should return the name of the Portfolio', async () => {
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);
      const spy = jest.spyOn(numberedPortfolio, 'exists').mockResolvedValue(true);
      const rawPortfolioName = dsMockUtils.createMockBytes(portfolioName);
      dsMockUtils.createQueryMock('portfolio', 'portfolios', {
        returnValue: rawPortfolioName,
      });
      when(jest.spyOn(utilsConversionModule, 'bytesToString'))
        .calledWith(rawPortfolioName)
        .mockReturnValue(portfolioName);

      const result = await numberedPortfolio.getName();

      expect(result).toEqual(portfolioName);
      spy.mockRestore();
    });

    it('should throw an error if the Portfolio no longer exists', async () => {
      const emptyName = dsMockUtils.createMockText('');
      dsMockUtils.createQueryMock('portfolio', 'portfolios', {
        returnValue: emptyName,
      });
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);
      const spy = jest.spyOn(numberedPortfolio, 'exists').mockResolvedValue(false);
      let error;
      try {
        await numberedPortfolio.getName();
      } catch (err) {
        error = err;
      }
      const expectedError = new PolymeshError({
        code: ErrorCode.DataUnavailable,
        message: "The Portfolio doesn't exist",
      });
      expect(error).toEqual(expectedError);
      spy.mockRestore();
    });
  });

  describe('method: createdAt', () => {
    const id = new BigNumber(1);
    const did = 'someDid';
    const variables = {
      moduleId: ModuleIdEnum.Portfolio,
      eventId: EventIdEnum.PortfolioCreated,
      eventArg0: did,
      eventArg1: id.toString(),
    };

    beforeEach(() => {
      dsMockUtils.configureMocks({
        contextOptions: { middlewareV2Enabled: false },
      });
    });

    it('should return the event identifier object of the portfolio creation', async () => {
      const blockNumber = new BigNumber(1234);
      const blockDate = new Date('4/14/2020');
      const eventIdx = new BigNumber(1);
      const fakeResult = { blockNumber, blockDate, eventIndex: eventIdx };
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);

      dsMockUtils.createApolloQueryMock(eventByIndexedArgs(variables), {
        /* eslint-disable @typescript-eslint/naming-convention */
        eventByIndexedArgs: {
          block_id: blockNumber.toNumber(),
          block: { datetime: blockDate },
          event_idx: eventIdx.toNumber(),
        },
        /* eslint-enable @typescript-eslint/naming-convention */
      });

      const result = await numberedPortfolio.createdAt();

      expect(result).toEqual(fakeResult);
    });

    it('should return null if the query result is empty', async () => {
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);

      dsMockUtils.createApolloQueryMock(eventByIndexedArgs(variables), {});
      const result = await numberedPortfolio.createdAt();
      expect(result).toBeNull();
    });

    it('should call v2 query if middlewareV2 is enabled', async () => {
      dsMockUtils.configureMocks({
        contextOptions: { middlewareV2Enabled: true },
      });
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);
      const fakeResult = 'fakeResult' as unknown as EventIdentifier;
      jest.spyOn(numberedPortfolio, 'createdAtV2').mockResolvedValue(fakeResult);

      const result = await numberedPortfolio.createdAt();
      expect(result).toEqual(fakeResult);
    });
  });

  describe('method: createdAtV2', () => {
    const id = new BigNumber(1);
    const did = 'someDid';
    const variables = {
      identityId: did,
      number: id.toNumber(),
    };

    it('should return the event identifier object of the portfolio creation', async () => {
      const blockNumber = new BigNumber(1234);
      const blockDate = new Date('4/14/2020');
      const eventIdx = new BigNumber(1);
      const blockHash = 'someHash';
      const fakeResult = { blockNumber, blockHash, blockDate, eventIndex: eventIdx };
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);

      dsMockUtils.createApolloV2QueryMock(portfolioQuery(variables), {
        portfolios: {
          nodes: [
            {
              createdBlock: {
                datetime: blockDate,
                hash: blockHash,
                blockId: blockNumber.toNumber(),
              },
              eventIdx: eventIdx.toNumber(),
            },
          ],
        },
      });

      const result = await numberedPortfolio.createdAtV2();

      expect(result).toEqual(fakeResult);
    });

    it('should return null if the query result is empty', async () => {
      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);

      dsMockUtils.createApolloV2QueryMock(portfolioQuery(variables), {
        portfolios: {
          nodes: [],
        },
      });
      const result = await numberedPortfolio.createdAtV2();
      expect(result).toBeNull();
    });
  });

  describe('method: exists', () => {
    it('should return whether the portfolio exists', async () => {
      const did = 'someDid';
      const id = new BigNumber(1);
      const portfolioId = new BigNumber(0);

      const portfoliosMock = dsMockUtils.createQueryMock('portfolio', 'portfolios', {
        size: new BigNumber(0),
      });

      jest
        .spyOn(utilsConversionModule, 'stringToIdentityId')
        .mockReturnValue(dsMockUtils.createMockIdentityId(did));
      jest
        .spyOn(utilsConversionModule, 'bigNumberToU64')
        .mockReturnValue(dsMockUtils.createMockU64(portfolioId));

      const numberedPortfolio = new NumberedPortfolio({ id, did }, context);

      let result = await numberedPortfolio.exists();
      expect(result).toBe(false);

      portfoliosMock.size.mockResolvedValue(dsMockUtils.createMockU64(new BigNumber(10)));

      result = await numberedPortfolio.exists();
      expect(result).toBe(true);
    });
  });
});
