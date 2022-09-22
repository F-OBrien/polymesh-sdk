import { StorageKey, u64 } from '@polkadot/types';
import { AccountId, Balance } from '@polkadot/types/interfaces';
import {
  PolymeshPrimitivesIdentityDidRecord,
  PolymeshPrimitivesIdentityId,
  PolymeshPrimitivesSecondaryKeyKeyRecord,
  PolymeshPrimitivesSecondaryKeyPermissions,
  PolymeshPrimitivesTicker,
} from '@polkadot/types/lookup';
import { bool } from '@polkadot/types/primitive';
import BigNumber from 'bignumber.js';
import { when } from 'jest-when';

import { Asset, Context, Entity, Identity } from '~/internal';
import { tokensByTrustedClaimIssuer, tokensHeldByDid } from '~/middleware/queries';
import { assetHoldersQuery, trustingAssetsQuery } from '~/middleware/queriesV2';
import { AssetHoldersOrderBy } from '~/middleware/typesV2';
import { ScopeId } from '~/polkadot/polymesh/types';
import { dsMockUtils, entityMockUtils } from '~/testUtils/mocks';
import { MockContext } from '~/testUtils/mocks/dataSources';
import {
  Account,
  DistributionWithDetails,
  IdentityRole,
  Order,
  PermissionedAccount,
  Permissions,
  PortfolioCustodianRole,
  Role,
  RoleType,
  TickerOwnerRole,
  VenueOwnerRole,
  VenueType,
} from '~/types';
import { tuple } from '~/types/utils';
import * as utilsConversionModule from '~/utils/conversion';
import * as utilsInternalModule from '~/utils/internal';

jest.mock(
  '~/api/entities/TickerReservation',
  require('~/testUtils/mocks/entities').mockTickerReservationModule(
    '~/api/entities/TickerReservation'
  )
);
jest.mock(
  '~/api/entities/Asset',
  require('~/testUtils/mocks/entities').mockAssetModule('~/api/entities/Asset')
);
jest.mock(
  '~/api/entities/Account',
  require('~/testUtils/mocks/entities').mockAccountModule('~/api/entities/Account')
);
jest.mock(
  '~/api/entities/Venue',
  require('~/testUtils/mocks/entities').mockVenueModule('~/api/entities/Venue')
);
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
jest.mock(
  '~/api/entities/Instruction',
  require('~/testUtils/mocks/entities').mockInstructionModule('~/api/entities/Instruction')
);

describe('Identity class', () => {
  let context: MockContext;
  let stringToIdentityIdStub: jest.SpyInstance<PolymeshPrimitivesIdentityId, [string, Context]>;
  let identityIdToStringStub: jest.SpyInstance<string, [PolymeshPrimitivesIdentityId]>;

  beforeAll(() => {
    dsMockUtils.initMocks();
    entityMockUtils.initMocks();
    stringToIdentityIdStub = jest.spyOn(utilsConversionModule, 'stringToIdentityId');
    identityIdToStringStub = jest.spyOn(utilsConversionModule, 'identityIdToString');
  });

  beforeEach(() => {
    context = dsMockUtils.getContextInstance({
      middlewareEnabled: true,
    });
  });

  afterEach(() => {
    dsMockUtils.reset();
    entityMockUtils.reset();
  });

  afterAll(() => {
    dsMockUtils.cleanup();
  });

  it('should extend Entity', () => {
    expect(Identity.prototype instanceof Entity).toBe(true);
  });

  describe('constructor', () => {
    it('should assign did to instance', () => {
      const did = 'abc';
      const identity = new Identity({ did }, context);

      expect(identity.did).toBe(did);
    });
  });

  describe('method: isUniqueIdentifiers', () => {
    it('should return true if the object conforms to the interface', () => {
      expect(Identity.isUniqueIdentifiers({ did: 'someDid' })).toBe(true);
      expect(Identity.isUniqueIdentifiers({})).toBe(false);
      expect(Identity.isUniqueIdentifiers({ did: 3 })).toBe(false);
    });
  });

  describe('method: checkRoles', () => {
    beforeAll(() => {
      entityMockUtils.initMocks();
    });

    afterEach(() => {
      entityMockUtils.reset();
    });

    it('should return whether the Identity possesses all roles', async () => {
      const identity = new Identity({ did: 'someDid' }, context);
      const roles: TickerOwnerRole[] = [
        { type: RoleType.TickerOwner, ticker: 'SOME_TICKER' },
        { type: RoleType.TickerOwner, ticker: 'otherTicker' },
      ];
      const spy = jest.spyOn(identity, 'isEqual').mockReturnValue(true);

      let result = await identity.checkRoles(roles);

      expect(result).toEqual({
        result: true,
      });

      const stub = jest.fn();

      stub
        .mockResolvedValueOnce({
          owner: identity,
        })
        .mockResolvedValue({
          owner: null,
        });

      entityMockUtils.configureMocks({
        tickerReservationOptions: {
          details: stub,
        },
      });

      result = await identity.checkRoles(roles);

      expect(result).toEqual({
        result: false,
        missingRoles: [{ type: RoleType.TickerOwner, ticker: 'otherTicker' }],
      });

      spy.mockRestore();
    });
  });

  describe('method: hasRole', () => {
    beforeAll(() => {
      entityMockUtils.initMocks();
    });

    afterEach(() => {
      entityMockUtils.reset();
    });

    it('should check whether the Identity has the Ticker Owner role', async () => {
      const identity = new Identity({ did: 'someDid' }, context);
      const role: TickerOwnerRole = { type: RoleType.TickerOwner, ticker: 'SOME_TICKER' };
      const spy = jest.spyOn(identity, 'isEqual').mockReturnValue(true);

      let hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(true);

      identity.did = 'otherDid';
      spy.mockReturnValue(false);

      hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(false);
      spy.mockRestore();
    });

    it('should check whether the Identity has the CDD Provider role', async () => {
      const did = 'someDid';
      const identity = new Identity({ did }, context);
      const role: Role = { type: RoleType.CddProvider };
      const rawDid = dsMockUtils.createMockIdentityId(did);

      dsMockUtils
        .createQueryStub('cddServiceProviders', 'activeMembers')
        .mockResolvedValue([rawDid]);

      when(identityIdToStringStub).calledWith(rawDid).mockReturnValue(did);

      let hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(true);

      identity.did = 'otherDid';

      hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(false);
    });

    it('should check whether the Identity has the Venue Owner role', async () => {
      const did = 'someDid';
      const identity = new Identity({ did }, context);
      const role: VenueOwnerRole = { type: RoleType.VenueOwner, venueId: new BigNumber(10) };

      entityMockUtils.configureMocks({
        venueOptions: {
          details: {
            owner: new Identity({ did }, context),
            type: VenueType.Sto,
            description: 'aVenue',
          },
        },
      });

      const spy = jest.spyOn(identity, 'isEqual').mockReturnValue(true);
      let hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(true);

      identity.did = 'otherDid';

      spy.mockReturnValue(false);
      hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(false);
      spy.mockRestore();
    });

    it('should check whether the Identity has the Portfolio Custodian role', async () => {
      const did = 'someDid';
      const identity = new Identity({ did }, context);
      const portfolioId = {
        did,
        number: new BigNumber(1),
      };
      let role: PortfolioCustodianRole = { type: RoleType.PortfolioCustodian, portfolioId };

      entityMockUtils.configureMocks({
        numberedPortfolioOptions: { isCustodiedBy: true },
        defaultPortfolioOptions: { isCustodiedBy: false },
      });

      let hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(true);

      role = { type: RoleType.PortfolioCustodian, portfolioId: { did } };

      hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(false);
    });

    it('should check whether the Identity has the Identity role', async () => {
      const did = 'someDid';
      const identity = new Identity({ did }, context);
      const role: IdentityRole = { type: RoleType.Identity, did };

      let hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(true);

      identity.did = 'otherDid';

      hasRole = await identity.hasRole(role);

      expect(hasRole).toBe(false);
    });

    it('should throw an error if the role is not recognized', () => {
      const identity = new Identity({ did: 'someDid' }, context);
      const type = 'Fake' as RoleType;
      const role = { type, ticker: 'SOME_TICKER' } as TickerOwnerRole;

      const hasRole = identity.hasRole(role);

      return expect(hasRole).rejects.toThrow(`Unrecognized role "${JSON.stringify(role)}"`);
    });
  });

  describe('method: hasRoles', () => {
    beforeAll(() => {
      entityMockUtils.initMocks();
    });

    afterEach(() => {
      entityMockUtils.reset();
    });

    it('should return true if the Identity possesses all roles', async () => {
      const identity = new Identity({ did: 'someDid' }, context);
      const roles: TickerOwnerRole[] = [
        { type: RoleType.TickerOwner, ticker: 'SOME_TICKER' },
        { type: RoleType.TickerOwner, ticker: 'otherTicker' },
      ];
      const spy = jest.spyOn(identity, 'isEqual').mockReturnValue(true);

      const hasRole = await identity.hasRoles(roles);

      expect(hasRole).toBe(true);
      spy.mockRestore();
    });

    it("should return false if at least one role isn't possessed by the Identity", async () => {
      const identity = new Identity({ did: 'someDid' }, context);
      const roles: TickerOwnerRole[] = [
        { type: RoleType.TickerOwner, ticker: 'SOME_TICKER' },
        { type: RoleType.TickerOwner, ticker: 'otherTicker' },
      ];

      const stub = jest.fn();

      stub
        .mockReturnValue({
          owner: identity,
        })
        .mockReturnValue({
          owner: null,
        });

      entityMockUtils.configureMocks({
        tickerReservationOptions: {
          details: stub,
        },
      });

      const hasRole = await identity.hasRoles(roles);

      expect(hasRole).toBe(false);
    });
  });

  describe('method: getAssetBalance', () => {
    let ticker: string;
    let did: string;
    let rawTicker: PolymeshPrimitivesTicker;
    let rawIdentityId: PolymeshPrimitivesIdentityId;
    let fakeValue: BigNumber;
    let fakeBalance: Balance;
    let mockContext: Context;
    let balanceOfStub: jest.SpyInstance;
    let assetStub: jest.SpyInstance;

    let identity: Identity;

    beforeAll(() => {
      ticker = 'TEST';
      did = 'someDid';
      rawTicker = dsMockUtils.createMockTicker(ticker);
      rawIdentityId = dsMockUtils.createMockIdentityId(did);
      fakeValue = new BigNumber(100);
      fakeBalance = dsMockUtils.createMockBalance(fakeValue);
      mockContext = dsMockUtils.getContextInstance();
      balanceOfStub = dsMockUtils.createQueryStub('asset', 'balanceOf');
      assetStub = dsMockUtils.createQueryStub('asset', 'tokens');

      when(stringToIdentityIdStub).calledWith(did, mockContext).mockReturnValue(rawIdentityId);

      identity = new Identity({ did }, mockContext);

      when(jest.spyOn(utilsConversionModule, 'stringToTicker'))
        .calledWith(ticker, mockContext)
        .mockReturnValue(rawTicker);

      when(jest.spyOn(utilsConversionModule, 'balanceToBigNumber'))
        .calledWith(fakeBalance)
        .mockReturnValue(fakeValue);
    });

    beforeEach(() => {
      when(assetStub)
        .calledWith(rawTicker)
        .mockResolvedValue(
          dsMockUtils.createMockSecurityToken({
            ownerDid: dsMockUtils.createMockIdentityId('tokenOwner'),
            totalSupply: dsMockUtils.createMockBalance(new BigNumber(3000)),
            divisible: dsMockUtils.createMockBool(true),
            assetType: dsMockUtils.createMockAssetType('EquityCommon'),
          })
        );
    });

    it('should return the balance of a given Asset', async () => {
      when(balanceOfStub).calledWith(rawTicker, rawIdentityId).mockResolvedValue(fakeBalance);

      const result = await identity.getAssetBalance({ ticker });

      expect(result).toEqual(fakeValue);
    });

    it('should allow subscription', async () => {
      const unsubCallback = 'unsubCallback';
      const callback = jest.fn();

      when(balanceOfStub)
        .calledWith(rawTicker, rawIdentityId, expect.any(Function))
        .mockImplementation(async (_a, _b, cbFunc) => {
          cbFunc(fakeBalance);
          return unsubCallback;
        });

      const result = await identity.getAssetBalance({ ticker }, callback);

      expect(result).toEqual(unsubCallback);
      expect(callback).toBeCalledWith(fakeValue);
    });

    it("should throw an error if the Asset doesn't exist", async () => {
      when(assetStub)
        .calledWith(rawTicker)
        .mockResolvedValue(dsMockUtils.createMockSecurityToken());

      let error;

      try {
        await identity.getAssetBalance({ ticker });
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe(`There is no Asset with ticker "${ticker}"`);
    });
  });

  describe('method: hasValidCdd', () => {
    it('should return whether the Identity has valid CDD', async () => {
      const did = 'someDid';
      const statusResponse = true;
      const mockContext = dsMockUtils.getContextInstance();
      const rawIdentityId = dsMockUtils.createMockIdentityId(did);
      const fakeHasValidCdd = dsMockUtils.createMockCddStatus({
        Ok: rawIdentityId,
      });

      when(stringToIdentityIdStub).calledWith(did, mockContext).mockReturnValue(rawIdentityId);

      when(dsMockUtils.createRpcStub('identity', 'isIdentityHasValidCdd'))
        .calledWith(rawIdentityId)
        .mockResolvedValue(fakeHasValidCdd);

      when(jest.spyOn(utilsConversionModule, 'cddStatusToBoolean'))
        .calledWith(fakeHasValidCdd)
        .mockReturnValue(statusResponse);

      const identity = new Identity({ did }, context);
      const result = await identity.hasValidCdd();

      expect(result).toEqual(statusResponse);
    });
  });

  describe('method: isGcMember', () => {
    it('should return whether the Identity is GC member', async () => {
      const did = 'someDid';
      const rawDid = dsMockUtils.createMockIdentityId(did);
      const mockContext = dsMockUtils.getContextInstance();
      const identity = new Identity({ did }, mockContext);

      when(identityIdToStringStub).calledWith(rawDid).mockReturnValue(did);

      dsMockUtils
        .createQueryStub('committeeMembership', 'activeMembers')
        .mockResolvedValue([rawDid, dsMockUtils.createMockIdentityId('otherDid')]);

      const result = await identity.isGcMember();

      expect(result).toBeTruthy();
    });
  });

  describe('method: isCddProvider', () => {
    it('should return whether the Identity is a CDD provider', async () => {
      const did = 'someDid';
      const rawDid = dsMockUtils.createMockIdentityId(did);
      const mockContext = dsMockUtils.getContextInstance();
      const identity = new Identity({ did }, mockContext);

      when(identityIdToStringStub).calledWith(rawDid).mockReturnValue(did);

      dsMockUtils
        .createQueryStub('cddServiceProviders', 'activeMembers')
        .mockResolvedValue([rawDid, dsMockUtils.createMockIdentityId('otherDid')]);

      const result = await identity.isCddProvider();

      expect(result).toBeTruthy();
    });
  });

  describe('method: getPrimaryAccount', () => {
    const did = 'someDid';
    const accountId = '5EYCAe5ijAx5xEfZdpCna3grUpY1M9M5vLUH5vpmwV1EnaYR';

    let accountIdToStringStub: jest.SpyInstance<string, [AccountId]>;
    let didRecordsStub: jest.SpyInstance;
    let rawDidRecord: PolymeshPrimitivesIdentityDidRecord;
    let fakeResult: PermissionedAccount;

    beforeAll(() => {
      accountIdToStringStub = jest.spyOn(utilsConversionModule, 'accountIdToString');
      accountIdToStringStub.mockReturnValue(accountId);
    });

    beforeEach(() => {
      didRecordsStub = dsMockUtils.createQueryStub('identity', 'didRecords');
      rawDidRecord = dsMockUtils.createMockIdentityDidRecord({
        primaryKey: dsMockUtils.createMockOption(dsMockUtils.createMockAccountId(accountId)),
      });

      const account = expect.objectContaining({ address: accountId });

      fakeResult = {
        account,
        permissions: {
          assets: null,
          portfolios: null,
          transactions: null,
          transactionGroups: [],
        },
      };
    });

    it('should return a PrimaryAccount', async () => {
      const mockContext = dsMockUtils.getContextInstance();
      const identity = new Identity({ did }, mockContext);

      didRecordsStub.mockReturnValue(dsMockUtils.createMockOption(rawDidRecord));

      const result = await identity.getPrimaryAccount();
      expect(result).toEqual({
        account: expect.objectContaining({ address: accountId }),
        permissions: {
          assets: null,
          transactions: null,
          portfolios: null,
          transactionGroups: [],
        },
      });
    });

    it('should allow subscription', async () => {
      const mockContext = dsMockUtils.getContextInstance();
      const identity = new Identity({ did }, mockContext);

      const unsubCallback = 'unsubCallBack';

      didRecordsStub.mockImplementation(async (_, cbFunc) => {
        cbFunc(dsMockUtils.createMockOption(rawDidRecord));
        return unsubCallback;
      });

      const callback = jest.fn();
      const result = await identity.getPrimaryAccount(callback);

      expect(result).toBe(unsubCallback);
      expect(callback).toHaveBeenCalledWith({
        ...fakeResult,
        account: expect.objectContaining({ address: accountId }),
      });
    });
  });

  describe('method: getTrustingAssets', () => {
    const did = 'someDid';
    const tickers = ['ASSET1\0\0', 'ASSET2\0\0'];

    it('should return a list of Assets', async () => {
      context = dsMockUtils.getContextInstance({
        middlewareEnabled: true,
      });
      dsMockUtils.createApolloQueryStub(tokensByTrustedClaimIssuer({ claimIssuerDid: did }), {
        tokensByTrustedClaimIssuer: tickers,
      });
      const identity = new Identity({ did }, context);

      const result = await identity.getTrustingAssets();

      expect(result[0].ticker).toBe('ASSET1');
      expect(result[1].ticker).toBe('ASSET2');
    });
  });

  describe('method: getTrustingAssetsV2', () => {
    const did = 'someDid';
    const tickers = ['ASSET1', 'ASSET2'];

    it('should return a list of Assets', async () => {
      const identity = new Identity({ did }, context);

      dsMockUtils.createApolloV2QueryStub(trustingAssetsQuery({ issuer: did }), {
        trustedClaimIssuers: {
          nodes: tickers.map(ticker => ({ assetId: ticker })),
        },
      });

      const result = await identity.getTrustingAssetsV2();

      expect(result[0].ticker).toBe('ASSET1');
      expect(result[1].ticker).toBe('ASSET2');
    });
  });

  describe('method: getHeldAssets', () => {
    const did = 'someDid';
    const tickers = ['ASSET1', 'ASSET2'];

    it('should return a list of Assets', async () => {
      const identity = new Identity({ did }, context);

      dsMockUtils.createApolloQueryStub(
        tokensHeldByDid({ did, count: undefined, skip: undefined, order: Order.Asc }),
        {
          tokensHeldByDid: { items: tickers, totalCount: 2 },
        }
      );

      let result = await identity.getHeldAssets();

      expect(result.data[0].ticker).toBe(tickers[0]);
      expect(result.data[1].ticker).toBe(tickers[1]);

      dsMockUtils.createApolloQueryStub(
        tokensHeldByDid({ did, count: 1, skip: 0, order: Order.Asc }),
        {
          tokensHeldByDid: { items: tickers, totalCount: 2 },
        }
      );

      result = await identity.getHeldAssets({
        start: new BigNumber(0),
        size: new BigNumber(1),
        order: Order.Asc,
      });

      expect(result.data[0].ticker).toBe(tickers[0]);
      expect(result.data[1].ticker).toBe(tickers[1]);
    });
  });

  describe('method: getHeldAssetsV2', () => {
    const did = 'someDid';
    const tickers = ['ASSET1', 'ASSET2'];

    it('should return a list of Assets', async () => {
      const identity = new Identity({ did }, context);

      dsMockUtils.createApolloV2QueryStub(assetHoldersQuery({ identityId: did }), {
        assetHolders: { nodes: tickers.map(ticker => ({ assetId: ticker })), totalCount: 2 },
      });

      let result = await identity.getHeldAssetsV2();

      expect(result.data[0].ticker).toBe(tickers[0]);
      expect(result.data[1].ticker).toBe(tickers[1]);

      dsMockUtils.createApolloV2QueryStub(
        assetHoldersQuery(
          { identityId: did },
          new BigNumber(1),
          new BigNumber(0),
          AssetHoldersOrderBy.CreatedBlockIdAsc
        ),
        {
          assetHolders: { nodes: tickers.map(ticker => ({ assetId: ticker })), totalCount: 2 },
        }
      );

      result = await identity.getHeldAssetsV2({
        start: new BigNumber(0),
        size: new BigNumber(1),
        order: AssetHoldersOrderBy.CreatedBlockIdAsc,
      });

      expect(result.data[0].ticker).toBe(tickers[0]);
      expect(result.data[1].ticker).toBe(tickers[1]);
    });
  });

  describe('method: getVenues', () => {
    let did: string;
    let venueId: BigNumber;

    let rawDid: PolymeshPrimitivesIdentityId;
    let rawVenueId: u64;

    beforeAll(() => {
      did = 'someDid';
      venueId = new BigNumber(10);

      rawDid = dsMockUtils.createMockIdentityId(did);
      rawVenueId = dsMockUtils.createMockU64(venueId);
    });

    beforeEach(() => {
      when(stringToIdentityIdStub).calledWith(did, context).mockReturnValue(rawDid);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return a list of Venues', async () => {
      when(dsMockUtils.createQueryStub('settlement', 'userVenues'))
        .calledWith(rawDid)
        .mockResolvedValue([rawVenueId]);

      const identity = new Identity({ did }, context);

      const result = await identity.getVenues();
      expect(result[0].id).toEqual(venueId);
    });

    it('should allow subscription', async () => {
      const unsubCallback = 'unsubCallBack';

      dsMockUtils
        .createQueryStub('settlement', 'userVenues')
        .mockImplementation(async (_, cbFunc) => {
          cbFunc([rawVenueId]);
          return unsubCallback;
        });

      const identity = new Identity({ did }, context);

      const callback = jest.fn();
      const result = await identity.getVenues(callback);
      expect(result).toEqual(unsubCallback);
      expect(callback).toHaveBeenCalledWith([expect.objectContaining({ id: venueId })]);
    });
  });

  describe('method: exists', () => {
    it('should return whether the Identity exists', async () => {
      const identity = new Identity({ did: 'someDid' }, context);

      dsMockUtils.createQueryStub('identity', 'didRecords', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockIdentityDidRecord({
            primaryKey: dsMockUtils.createMockOption(dsMockUtils.createMockAccountId('someId')),
          })
        ),
      });

      await expect(identity.exists()).resolves.toBe(true);

      dsMockUtils.createQueryStub('identity', 'didRecords', {
        returnValue: dsMockUtils.createMockOption(),
      });

      await expect(identity.exists()).resolves.toBe(false);

      dsMockUtils.createQueryStub('identity', 'didRecords', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockIdentityDidRecord({
            primaryKey: dsMockUtils.createMockOption(),
          })
        ),
      });

      return expect(identity.exists()).resolves.toBe(false);
    });
  });

  describe('method: getScopeId', () => {
    let did: string;
    let identity: Identity;
    let ticker: string;
    let scopeId: string;

    let rawDid: PolymeshPrimitivesIdentityId;
    let rawTicker: PolymeshPrimitivesTicker;
    let rawScopeId: ScopeId;

    let stringToTickerStub: jest.SpyInstance<PolymeshPrimitivesTicker, [string, Context]>;

    beforeAll(() => {
      did = 'someDid';
      ticker = 'SOME_TICKER';
      scopeId = 'someScopeId';

      rawDid = dsMockUtils.createMockIdentityId(did);
      rawTicker = dsMockUtils.createMockTicker(ticker);
      rawScopeId = dsMockUtils.createMockScopeId(scopeId);

      stringToTickerStub = jest.spyOn(utilsConversionModule, 'stringToTicker');
    });

    beforeEach(() => {
      when(stringToIdentityIdStub).calledWith(did, context).mockReturnValue(rawDid);
      when(stringToTickerStub).calledWith(ticker, context).mockReturnValue(rawTicker);
      identity = new Identity({ did: 'someDid' }, context);

      dsMockUtils.createQueryStub('asset', 'scopeIdOf', {
        returnValue: rawScopeId,
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("should return the Identity's scopeId associated to the Asset", async () => {
      let result = await identity.getScopeId({ asset: ticker });
      expect(result).toEqual(scopeId);

      result = await identity.getScopeId({
        asset: entityMockUtils.getAssetInstance({ ticker }),
      });
      expect(result).toEqual(scopeId);
    });

    it("should return null if the Identity doesn't have a ScopeId for the Asset", async () => {
      dsMockUtils.createQueryStub('asset', 'scopeIdOf', {
        returnValue: dsMockUtils.createMockScopeId(),
      });

      const result = await identity.getScopeId({ asset: ticker });
      expect(result).toBeNull();
    });
  });

  describe('method: getInstructions', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return all instructions in which the identity is involved, grouped by status', async () => {
      const id1 = new BigNumber(1);
      const id2 = new BigNumber(2);
      const id3 = new BigNumber(3);
      const id4 = new BigNumber(4);
      const id5 = new BigNumber(5);

      const did = 'someDid';
      const identity = new Identity({ did }, context);

      const defaultPortfolioDid = 'someDid';
      const numberedPortfolioDid = 'someDid';
      const numberedPortfolioId = new BigNumber(1);

      const defaultPortfolio = entityMockUtils.getDefaultPortfolioInstance({
        did: defaultPortfolioDid,
        isCustodiedBy: true,
      });

      const numberedPortfolio = entityMockUtils.getNumberedPortfolioInstance({
        did: numberedPortfolioDid,
        id: numberedPortfolioId,
        isCustodiedBy: false,
      });

      identity.portfolios.getPortfolios = jest
        .fn()
        .mockResolvedValue([defaultPortfolio, numberedPortfolio]);

      identity.portfolios.getCustodiedPortfolios = jest
        .fn()
        .mockResolvedValue({ data: [], next: null });

      const portfolioLikeToPortfolioIdStub = jest.spyOn(
        utilsConversionModule,
        'portfolioLikeToPortfolioId'
      );

      when(portfolioLikeToPortfolioIdStub)
        .calledWith(defaultPortfolio)
        .mockReturnValue({ did: defaultPortfolioDid, number: undefined });
      when(portfolioLikeToPortfolioIdStub)
        .calledWith(numberedPortfolio)
        .mockReturnValue({ did: numberedPortfolioDid, number: numberedPortfolioId });

      const rawPortfolio = dsMockUtils.createMockPortfolioId({
        did: dsMockUtils.createMockIdentityId(did),
        kind: dsMockUtils.createMockPortfolioKind('Default'),
      });

      const portfolioIdToMeshPortfolioIdStub = jest.spyOn(
        utilsConversionModule,
        'portfolioIdToMeshPortfolioId'
      );

      when(portfolioIdToMeshPortfolioIdStub)
        .calledWith({ did, number: undefined }, context)
        .mockReturnValue(rawPortfolio);

      const userAuthsStub = dsMockUtils.createQueryStub('settlement', 'userAffirmations');

      const rawId1 = dsMockUtils.createMockU64(id1);
      const rawId2 = dsMockUtils.createMockU64(id2);
      const rawId3 = dsMockUtils.createMockU64(id3);
      const rawId4 = dsMockUtils.createMockU64(id4);
      const rawId5 = dsMockUtils.createMockU64(id5);

      const entriesStub = jest.fn();
      when(entriesStub)
        .calledWith(rawPortfolio)
        .mockResolvedValue([
          tuple(
            { args: [rawPortfolio, rawId1] },
            dsMockUtils.createMockAffirmationStatus('Affirmed')
          ),
          tuple(
            { args: [rawPortfolio, rawId2] },
            dsMockUtils.createMockAffirmationStatus('Pending')
          ),
          tuple(
            { args: [rawPortfolio, rawId3] },
            dsMockUtils.createMockAffirmationStatus('Unknown')
          ),
          tuple(
            { args: [rawPortfolio, rawId4] },
            dsMockUtils.createMockAffirmationStatus('Affirmed')
          ),
          tuple(
            { args: [rawPortfolio, rawId5] },
            dsMockUtils.createMockAffirmationStatus('Unknown')
          ),
        ]);

      userAuthsStub.entries = entriesStub;

      const instructionDetailsStub = dsMockUtils.createQueryStub(
        'settlement',
        'instructionDetails',
        {
          multi: [],
        }
      );

      const multiStub = jest.fn();

      when(multiStub)
        .calledWith([rawId1, rawId2, rawId3, rawId4, rawId5])
        .mockResolvedValue([
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id1),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Pending'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id2),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Pending'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id3),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Unknown'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id4),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Failed'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id4),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Unknown'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
        ]);

      instructionDetailsStub.multi = multiStub;

      const result = await identity.getInstructions();

      expect(result.affirmed[0].id).toEqual(id1);
      expect(result.pending[0].id).toEqual(id2);
      expect(result.failed[0].id).toEqual(id4);
    });
  });

  describe('method: getPendingInstructions', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return all pending instructions in which the identity is involved', async () => {
      const id1 = new BigNumber(1);
      const id2 = new BigNumber(2);
      const id3 = new BigNumber(3);
      const id4 = new BigNumber(4);

      const did = 'someDid';
      const identity = new Identity({ did }, context);

      const defaultPortfolioDid = 'someDid';
      const numberedPortfolioDid = 'someDid';
      const numberedPortfolioId = new BigNumber(1);

      const defaultPortfolio = entityMockUtils.getDefaultPortfolioInstance({
        did: defaultPortfolioDid,
        isCustodiedBy: true,
      });

      const numberedPortfolio = entityMockUtils.getNumberedPortfolioInstance({
        did: numberedPortfolioDid,
        id: numberedPortfolioId,
        isCustodiedBy: false,
      });

      identity.portfolios.getPortfolios = jest
        .fn()
        .mockResolvedValue([defaultPortfolio, numberedPortfolio]);

      identity.portfolios.getCustodiedPortfolios = jest
        .fn()
        .mockResolvedValue({ data: [], next: null });

      const portfolioLikeToPortfolioIdStub = jest.spyOn(
        utilsConversionModule,
        'portfolioLikeToPortfolioId'
      );

      when(portfolioLikeToPortfolioIdStub)
        .calledWith(defaultPortfolio)
        .mockReturnValue({ did: defaultPortfolioDid, number: undefined });
      when(portfolioLikeToPortfolioIdStub)
        .calledWith(numberedPortfolio)
        .mockReturnValue({ did: numberedPortfolioDid, number: numberedPortfolioId });

      const rawPortfolio = dsMockUtils.createMockPortfolioId({
        did: dsMockUtils.createMockIdentityId(did),
        kind: dsMockUtils.createMockPortfolioKind('Default'),
      });

      const portfolioIdToMeshPortfolioIdStub = jest.spyOn(
        utilsConversionModule,
        'portfolioIdToMeshPortfolioId'
      );

      when(portfolioIdToMeshPortfolioIdStub)
        .calledWith({ did, number: undefined }, context)
        .mockReturnValue(rawPortfolio);

      const userAuthsStub = dsMockUtils.createQueryStub('settlement', 'userAffirmations');

      const rawId1 = dsMockUtils.createMockU64(id1);
      const rawId2 = dsMockUtils.createMockU64(id2);
      const rawId3 = dsMockUtils.createMockU64(id3);

      const entriesStub = jest.fn();
      when(entriesStub)
        .calledWith(rawPortfolio)
        .mockResolvedValue([
          tuple(
            { args: [rawPortfolio, rawId1] },
            dsMockUtils.createMockAffirmationStatus('Pending')
          ),
          tuple(
            { args: [rawPortfolio, rawId2] },
            dsMockUtils.createMockAffirmationStatus('Pending')
          ),
          tuple(
            { args: [rawPortfolio, rawId3] },
            dsMockUtils.createMockAffirmationStatus('Pending')
          ),
        ]);

      userAuthsStub.entries = entriesStub;

      const instructionDetailsStub = dsMockUtils.createQueryStub(
        'settlement',
        'instructionDetails',
        {
          multi: [],
        }
      );

      const multiStub = jest.fn();

      when(multiStub)
        .calledWith([rawId1, rawId2, rawId3])
        .mockResolvedValue([
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id1),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Pending'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id2),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Pending'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id3),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Unknown'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
          dsMockUtils.createMockInstruction({
            instructionId: dsMockUtils.createMockU64(id4),
            venueId: dsMockUtils.createMockU64(),
            status: dsMockUtils.createMockInstructionStatus('Pending'),
            settlementType: dsMockUtils.createMockSettlementType('SettleOnAffirmation'),
            createdAt: dsMockUtils.createMockOption(),
            tradeDate: dsMockUtils.createMockOption(),
            valueDate: dsMockUtils.createMockOption(),
          }),
        ]);

      instructionDetailsStub.multi = multiStub;

      const result = await identity.getPendingInstructions();

      expect(result.length).toBe(3);
      expect(result[0].id).toEqual(id1);
      expect(result[1].id).toEqual(id2);
      expect(result[2].id).toEqual(id4);
    });
  });

  describe('method: areSecondaryAccountsFrozen', () => {
    let frozenStub: jest.Mock;
    let boolValue: boolean;
    let rawBoolValue: bool;

    beforeAll(() => {
      boolValue = true;
      rawBoolValue = dsMockUtils.createMockBool(boolValue);
    });

    beforeEach(() => {
      frozenStub = dsMockUtils.createQueryStub('identity', 'isDidFrozen');
    });

    it('should return whether secondary key is frozen or not', async () => {
      const identity = new Identity({ did: 'someDid' }, context);

      frozenStub.mockResolvedValue(rawBoolValue);

      const result = await identity.areSecondaryAccountsFrozen();

      expect(result).toBe(boolValue);
    });

    it('should allow subscription', async () => {
      const identity = new Identity({ did: 'someDid' }, context);
      const unsubCallback = 'unsubCallBack';

      frozenStub.mockImplementation(async (_, cbFunc) => {
        cbFunc(rawBoolValue);
        return unsubCallback;
      });

      const callback = jest.fn();
      const result = await identity.areSecondaryAccountsFrozen(callback);

      expect(result).toBe(unsubCallback);
      expect(callback).toBeCalledWith(boolValue);
    });
  });

  describe('method: getPendingDistributions', () => {
    let assets: Asset[];
    let distributions: DistributionWithDetails[];
    let expectedDistribution: DistributionWithDetails;

    beforeAll(() => {
      assets = [
        entityMockUtils.getAssetInstance({ ticker: 'TICKER_1' }),
        entityMockUtils.getAssetInstance({ ticker: 'TICKER_2' }),
      ];
      const distributionTemplate = {
        expiryDate: null,
        perShare: new BigNumber(1),
        checkpoint: entityMockUtils.getCheckpointInstance({
          balance: new BigNumber(1000),
        }),
        paymentDate: new Date('10/14/1987'),
      };
      const detailsTemplate = {
        remainingFunds: new BigNumber(10000),
        fundsReclaimed: false,
      };
      expectedDistribution = {
        distribution: entityMockUtils.getDividendDistributionInstance(distributionTemplate),
        details: detailsTemplate,
      };
      distributions = [
        expectedDistribution,
        {
          distribution: entityMockUtils.getDividendDistributionInstance({
            ...distributionTemplate,
            expiryDate: new Date('10/14/1987'),
          }),
          details: detailsTemplate,
        },
        {
          distribution: entityMockUtils.getDividendDistributionInstance({
            ...distributionTemplate,
            paymentDate: new Date(new Date().getTime() + 3 * 60 * 1000),
          }),
          details: detailsTemplate,
        },
        {
          distribution: entityMockUtils.getDividendDistributionInstance({
            ...distributionTemplate,
            id: new BigNumber(5),
            ticker: 'HOLDER_PAID',
          }),
          details: detailsTemplate,
        },
      ];
    });

    beforeEach(() => {
      when(context.getDividendDistributionsForAssets)
        .calledWith({ assets })
        .mockResolvedValue(distributions);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return all distributions where the Identity can claim funds', async () => {
      const holderPaidStub = dsMockUtils.createQueryStub('capitalDistribution', 'holderPaid');

      const rawCaId = dsMockUtils.createMockCAId({
        ticker: 'HOLDER_PAID',
        localId: new BigNumber(5),
      });
      const rawIdentityId = dsMockUtils.createMockIdentityId('someDid');

      when(jest.spyOn(utilsConversionModule, 'stringToIdentityId'))
        .calledWith('someDid', context)
        .mockReturnValue(rawIdentityId);
      when(jest.spyOn(utilsConversionModule, 'corporateActionIdentifierToCaId'))
        .calledWith({ ticker: 'HOLDER_PAID', localId: new BigNumber(5) }, context)
        .mockReturnValue(rawCaId);

      holderPaidStub.mockResolvedValue(dsMockUtils.createMockBool(false));
      when(holderPaidStub)
        .calledWith([rawCaId, rawIdentityId])
        .mockResolvedValue(dsMockUtils.createMockBool(true));

      const identity = new Identity({ did: 'someDid' }, context);

      const heldAssetsStub = jest.spyOn(identity, 'getHeldAssets');
      heldAssetsStub
        .mockResolvedValueOnce({ data: [assets[0]], next: new BigNumber(1) })
        .mockResolvedValue({ data: [assets[1]], next: null });

      const result = await identity.getPendingDistributions();

      expect(result).toEqual([expectedDistribution]);
    });
  });

  describe('method: getSecondaryAccounts', () => {
    const accountId = 'someAccountId';

    let account: Account;
    let fakeResult: PermissionedAccount[];

    let rawPrimaryKeyRecord: PolymeshPrimitivesSecondaryKeyKeyRecord;
    let rawSecondaryKeyRecord: PolymeshPrimitivesSecondaryKeyKeyRecord;
    let rawMultiSigKeyRecord: PolymeshPrimitivesSecondaryKeyKeyRecord;
    let rawDidRecord: StorageKey;
    let accountIdToAccountStub: jest.SpyInstance<Account, [AccountId, Context]>;
    let meshPermissionsToPermissionsStub: jest.SpyInstance<
      Permissions,
      [PolymeshPrimitivesSecondaryKeyPermissions, Context]
    >;
    let getSecondaryAccountPermissionsStub: jest.SpyInstance;

    beforeAll(() => {
      account = entityMockUtils.getAccountInstance({ address: accountId });
      accountIdToAccountStub = jest.spyOn(utilsConversionModule, 'accountIdToAccount');
      meshPermissionsToPermissionsStub = jest.spyOn(
        utilsConversionModule,
        'meshPermissionsToPermissions'
      );
      getSecondaryAccountPermissionsStub = jest.spyOn(
        utilsInternalModule,
        'getSecondaryAccountPermissions'
      );
      fakeResult = [
        {
          account,
          permissions: {
            assets: null,
            portfolios: null,
            transactions: null,
            transactionGroups: [],
          },
        },
      ];
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    beforeEach(() => {
      rawPrimaryKeyRecord = dsMockUtils.createMockKeyRecord({
        PrimaryKey: dsMockUtils.createMockIdentityId('someDid'),
      });
      rawSecondaryKeyRecord = dsMockUtils.createMockKeyRecord({
        SecondaryKey: [dsMockUtils.createMockIdentityId(), dsMockUtils.createMockPermissions()],
      });
      rawMultiSigKeyRecord = dsMockUtils.createMockKeyRecord({
        MultiSigSignerKey: dsMockUtils.createMockAccountId('someAddress'),
      });
      rawDidRecord = {
        args: [dsMockUtils.createMockIdentityId(), dsMockUtils.createMockAccountId(accountId)],
      } as unknown as StorageKey;
      const entriesStub = jest.fn();
      entriesStub.mockResolvedValue([[rawDidRecord]]);
      dsMockUtils.createQueryStub('identity', 'didKeys', {
        entries: [[rawDidRecord.args, true]],
      });

      meshPermissionsToPermissionsStub.mockReturnValue({
        assets: null,
        portfolios: null,
        transactions: null,
        transactionGroups: [],
      });
      accountIdToAccountStub.mockReturnValue(account);
    });

    it('should return a list of Accounts', async () => {
      dsMockUtils.createQueryStub('identity', 'keyRecords', {
        multi: [
          dsMockUtils.createMockOption(rawPrimaryKeyRecord),
          dsMockUtils.createMockOption(rawSecondaryKeyRecord),
          dsMockUtils.createMockOption(rawMultiSigKeyRecord),
        ],
      });

      getSecondaryAccountPermissionsStub.mockReturnValue(fakeResult);
      const identity = new Identity({ did: 'someDid' }, context);

      let result = await identity.getSecondaryAccounts();
      expect(result).toEqual({ data: fakeResult, next: null });

      result = await identity.getSecondaryAccounts({ size: new BigNumber(20) });
      expect(result).toEqual({ data: fakeResult, next: null });
    });

    it('should allow subscription', async () => {
      const identity = new Identity({ did: 'someDid' }, context);
      const unsubCallback = 'unsubCallBack';

      const callback = jest.fn();

      getSecondaryAccountPermissionsStub.mockResolvedValue([
        {
          account,
          permissions: {
            assets: null,
            portfolios: null,
            transactions: null,
            transactionGroups: [],
          },
        },
      ]);
      getSecondaryAccountPermissionsStub.mockReturnValue(unsubCallback);

      const result = await identity.getSecondaryAccounts(callback);

      expect(result).toBe(unsubCallback);
    });
  });

  describe('method: toHuman', () => {
    it('should return a human readable version of the entity', () => {
      const identity = new Identity({ did: 'someDid' }, context);
      expect(identity.toHuman()).toBe('someDid');
    });
  });
});
