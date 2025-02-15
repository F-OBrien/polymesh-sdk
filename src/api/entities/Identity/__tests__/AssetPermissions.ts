import { PolymeshPrimitivesIdentityId, PolymeshPrimitivesTicker } from '@polkadot/types/lookup';
import BigNumber from 'bignumber.js';
import { when } from 'jest-when';

import {
  Context,
  Identity,
  KnownPermissionGroup,
  Namespace,
  PolymeshTransaction,
} from '~/internal';
import { eventByIndexedArgs, tickerExternalAgentActions } from '~/middleware/queries';
import { tickerExternalAgentActionsQuery, tickerExternalAgentsQuery } from '~/middleware/queriesV2';
import { EventIdEnum, ModuleIdEnum } from '~/middleware/types';
import { dsMockUtils, entityMockUtils, procedureMockUtils } from '~/testUtils/mocks';
import { Mocked } from '~/testUtils/types';
import {
  Asset,
  EventIdentifier,
  PermissionGroupType,
  PermissionType,
  ResultSet,
  TxTags,
} from '~/types';
import { tuple } from '~/types/utils';
import { MAX_TICKER_LENGTH } from '~/utils/constants';
import * as utilsConversionModule from '~/utils/conversion';
import * as utilsInternalModule from '~/utils/internal';

import { AssetPermissions } from '../AssetPermissions';

jest.mock(
  '~/base/Procedure',
  require('~/testUtils/mocks/procedure').mockProcedureModule('~/base/Procedure')
);

describe('AssetPermissions class', () => {
  const did = 'someDid';
  const ticker = 'SOME_TICKER';
  let asset: Mocked<Asset>;

  let context: Mocked<Context>;
  let assetPermissions: AssetPermissions;
  let identity: Identity;

  beforeAll(() => {
    dsMockUtils.initMocks();
    entityMockUtils.initMocks();
    procedureMockUtils.initMocks();
  });

  beforeEach(() => {
    context = dsMockUtils.getContextInstance();
    identity = entityMockUtils.getIdentityInstance({ did });
    asset = entityMockUtils.getAssetInstance({ ticker });
    assetPermissions = new AssetPermissions(identity, context);
  });

  afterEach(() => {
    entityMockUtils.reset();
    dsMockUtils.reset();
    procedureMockUtils.reset();
  });

  afterAll(() => {
    dsMockUtils.cleanup();
    procedureMockUtils.cleanup();
  });

  it('should extend namespace', () => {
    expect(AssetPermissions.prototype instanceof Namespace).toBe(true);
  });

  describe('method: getGroup', () => {
    it('should throw an error if the Identity is no longer an Agent', async () => {
      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(),
      });

      let error;

      try {
        await assetPermissions.getGroup({ asset });
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('This Identity is no longer an Agent for this Asset');
    });

    it('should return the permission group associated with the Agent', async () => {
      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(dsMockUtils.createMockAgentGroup('Full')),
      });

      const result = await assetPermissions.getGroup({ asset });

      expect(result instanceof KnownPermissionGroup).toEqual(true);
      expect((result as KnownPermissionGroup).type).toEqual(PermissionGroupType.Full);
    });
  });

  describe('method: enabledAt', () => {
    beforeEach(() => {
      dsMockUtils.configureMocks({
        contextOptions: { middlewareV2Enabled: false },
      });
    });

    it('should return the event identifier object of the agent added', async () => {
      const blockNumber = new BigNumber(1234);
      const blockDate = new Date('4/14/2020');
      const eventIdx = new BigNumber(1);
      const variables = {
        moduleId: ModuleIdEnum.Externalagents,
        eventId: EventIdEnum.AgentAdded,
        eventArg1: utilsInternalModule.padString(ticker, MAX_TICKER_LENGTH),
      };
      const fakeResult = { blockNumber, blockDate, eventIndex: eventIdx };

      dsMockUtils.createApolloQueryMock(eventByIndexedArgs(variables), {
        /* eslint-disable @typescript-eslint/naming-convention */
        eventByIndexedArgs: {
          block_id: blockNumber.toNumber(),
          block: { datetime: blockDate },
          event_idx: eventIdx.toNumber(),
        },
        /* eslint-enable @typescript-eslint/naming-convention */
      });

      const result = await assetPermissions.enabledAt({ asset });

      expect(result).toEqual(fakeResult);
    });

    it('should return null if the query result is empty', async () => {
      const variables = {
        moduleId: ModuleIdEnum.Externalagents,
        eventId: EventIdEnum.AgentAdded,
        eventArg1: utilsInternalModule.padString(ticker, MAX_TICKER_LENGTH),
      };

      dsMockUtils.createApolloQueryMock(eventByIndexedArgs(variables), {});
      const result = await assetPermissions.enabledAt({ asset });
      expect(result).toBeNull();
    });

    it('should call v2 query if middlewareV2 is enabled', async () => {
      dsMockUtils.configureMocks({
        contextOptions: { middlewareV2Enabled: true },
      });
      const fakeResult = 'fakeResult' as unknown as EventIdentifier;
      jest.spyOn(assetPermissions, 'enabledAtV2').mockResolvedValue(fakeResult);

      const result = await assetPermissions.enabledAt({ asset });
      expect(result).toEqual(fakeResult);
    });
  });

  describe('method: enabledAtV2', () => {
    it('should return the event identifier object of the agent added', async () => {
      const blockNumber = new BigNumber(1234);
      const blockDate = new Date('4/14/2020');
      const blockHash = 'someHash';
      const eventIdx = new BigNumber(1);
      const variables = {
        assetId: ticker,
      };
      const fakeResult = { blockNumber, blockHash, blockDate, eventIndex: eventIdx };

      dsMockUtils.createApolloV2QueryMock(tickerExternalAgentsQuery(variables), {
        tickerExternalAgents: {
          nodes: [
            {
              createdBlock: {
                blockId: blockNumber.toNumber(),
                datetime: blockDate,
                hash: blockHash,
              },
              eventIdx: eventIdx.toNumber(),
            },
          ],
        },
      });

      const result = await assetPermissions.enabledAtV2({ asset });

      expect(result).toEqual(fakeResult);
    });

    it('should return null if the query result is empty', async () => {
      const variables = {
        assetId: ticker,
      };

      dsMockUtils.createApolloV2QueryMock(tickerExternalAgentsQuery(variables), {
        tickerExternalAgents: { nodes: [] },
      });
      const result = await assetPermissions.enabledAtV2({ asset });
      expect(result).toBeNull();
    });
  });

  describe('method: setGroup', () => {
    it('should prepare the procedure and return the resulting transaction', async () => {
      const group = {
        transactions: {
          type: PermissionType.Include,
          values: [],
        },
        asset,
      };
      const expectedTransaction = 'someTransaction' as unknown as PolymeshTransaction<void>;

      when(procedureMockUtils.getPrepareMock())
        .calledWith({ args: { identity, group }, transformer: undefined }, context, {})
        .mockResolvedValue(expectedTransaction);

      const tx = await assetPermissions.setGroup({ group });

      expect(tx).toBe(expectedTransaction);
    });
  });

  describe('method: checkPermissions', () => {
    beforeAll(() => {
      entityMockUtils.initMocks();
    });

    afterEach(() => {
      entityMockUtils.reset();
    });

    it('should check whether the Identity has the appropriate permissions for the Asset', async () => {
      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(),
      });

      let result = await assetPermissions.checkPermissions({ asset, transactions: null });

      expect(result).toEqual({
        result: false,
        missingPermissions: null,
        message: 'The Identity is not an Agent for the Asset',
      });
      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(dsMockUtils.createMockAgentGroup('Full')),
      });

      result = await assetPermissions.checkPermissions({ asset, transactions: null });

      expect(result).toEqual({ result: true });

      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(dsMockUtils.createMockAgentGroup('ExceptMeta')),
      });

      result = await assetPermissions.checkPermissions({ asset, transactions: null });

      expect(result).toEqual({ result: false, missingPermissions: null });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.externalAgents.RemoveAgent],
      });

      expect(result).toEqual({
        result: false,
        missingPermissions: [TxTags.externalAgents.RemoveAgent],
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.asset.ControllerTransfer],
      });

      expect(result).toEqual({ result: true });

      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockAgentGroup('PolymeshV1PIA')
        ),
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.asset.CreateAsset],
      });

      expect(result).toEqual({
        result: false,
        missingPermissions: [TxTags.asset.CreateAsset],
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.asset.ControllerTransfer, TxTags.sto.Invest],
      });

      expect(result).toEqual({
        result: false,
        missingPermissions: [TxTags.sto.Invest],
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.asset.ControllerTransfer, TxTags.sto.FreezeFundraiser],
      });

      expect(result).toEqual({
        result: true,
      });

      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockAgentGroup('PolymeshV1CAA')
        ),
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.asset.CreateAsset],
      });

      expect(result).toEqual({
        result: false,
        missingPermissions: [TxTags.asset.CreateAsset],
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.corporateAction.ChangeRecordDate],
      });

      expect(result).toEqual({
        result: true,
      });

      dsMockUtils.createQueryMock('externalAgents', 'groupOfAgent', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockAgentGroup({ Custom: dsMockUtils.createMockU32(new BigNumber(1)) })
        ),
      });
      dsMockUtils.createQueryMock('externalAgents', 'groupPermissions', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockExtrinsicPermissions('Whole')
        ),
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.corporateAction.ChangeRecordDate],
      });

      expect(result).toEqual({
        result: true,
      });

      /* eslint-disable @typescript-eslint/naming-convention */
      dsMockUtils.createQueryMock('externalAgents', 'groupPermissions', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockExtrinsicPermissions({
            These: [
              dsMockUtils.createMockPalletPermissions({
                palletName: 'asset',
                dispatchableNames: {
                  Except: [dsMockUtils.createMockBytes('createAsset')],
                },
              }),
            ],
          })
        ),
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: null,
      });

      expect(result).toEqual({
        result: false,
        missingPermissions: null,
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.asset.CreateAsset],
      });

      expect(result).toEqual({
        result: false,
        missingPermissions: [TxTags.asset.CreateAsset],
      });

      dsMockUtils.createQueryMock('externalAgents', 'groupPermissions', {
        returnValue: dsMockUtils.createMockOption(
          dsMockUtils.createMockExtrinsicPermissions({
            Except: [
              dsMockUtils.createMockPalletPermissions({
                palletName: 'asset',
                dispatchableNames: 'Whole',
              }),
            ],
          })
        ),
      });

      result = await assetPermissions.checkPermissions({
        asset,
        transactions: [TxTags.identity.AddClaim],
      });

      expect(result).toEqual({
        result: true,
      });
      /* eslint-enable @typescript-eslint/naming-convention */
    });

    it('should throw an error if the transaction array is empty', () => {
      return expect(assetPermissions.checkPermissions({ asset, transactions: [] })).rejects.toThrow(
        'Cannot check Permissions for an empty transaction array'
      );
    });
  });

  describe('method: waive', () => {
    it('should prepare the procedure with the correct arguments and context, and return the resulting transaction', async () => {
      const args = {
        asset,
        identity,
      };

      const expectedTransaction = 'someTransaction' as unknown as PolymeshTransaction<void>;

      when(procedureMockUtils.getPrepareMock())
        .calledWith({ args, transformer: undefined }, context, {})
        .mockResolvedValue(expectedTransaction);

      const tx = await assetPermissions.waive(args);

      expect(tx).toBe(expectedTransaction);
    });
  });

  describe('method: get', () => {
    let rawDid: PolymeshPrimitivesIdentityId;
    let rawTicker: PolymeshPrimitivesTicker;
    let stringToIdentityIdSpy: jest.SpyInstance;

    beforeAll(() => {
      stringToIdentityIdSpy = jest.spyOn(utilsConversionModule, 'stringToIdentityId');
      rawDid = dsMockUtils.createMockIdentityId(did);
      rawTicker = dsMockUtils.createMockTicker(ticker);
    });

    beforeEach(() => {
      when(stringToIdentityIdSpy).calledWith(did, context).mockReturnValue(rawDid);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return a list of AgentWithGroup', async () => {
      const group = entityMockUtils.getKnownPermissionGroupInstance({
        ticker,
        type: PermissionGroupType.Full,
        getPermissions: {
          transactions: null,
          transactionGroups: [],
        },
      });

      entityMockUtils.configureMocks({
        assetOptions: {
          ticker,
        },
      });

      jest.spyOn(assetPermissions, 'getGroup').mockResolvedValue(group);

      dsMockUtils.createQueryMock('externalAgents', 'agentOf', {
        entries: [tuple([rawDid, rawTicker], {})],
      });

      const result = await assetPermissions.get();
      expect(result.length).toEqual(1);
      expect(result[0].asset.ticker).toEqual(ticker);
      expect(result[0].group instanceof KnownPermissionGroup).toEqual(true);
    });
  });

  describe('method: getOperationHistory', () => {
    it('should return the Events triggered by Operations the Identity has performed on a specific Asset', async () => {
      dsMockUtils.configureMocks({
        contextOptions: { middlewareV2Enabled: false },
      });
      const blockId = new BigNumber(1);
      const blockHash = 'someHash';
      const eventIndex = new BigNumber(1);
      const datetime = '2020-10-10';

      dsMockUtils.createQueryMock('system', 'blockHash', {
        multi: [dsMockUtils.createMockHash(blockHash)],
      });
      /* eslint-disable @typescript-eslint/naming-convention */
      dsMockUtils.createApolloQueryMock(
        tickerExternalAgentActions({
          ticker,
          caller_did: did,
          pallet_name: undefined,
          event_id: undefined,
          count: 1,
          skip: 0,
        }),
        {
          tickerExternalAgentActions: {
            totalCount: 1,
            items: [
              {
                block_id: blockId.toNumber(),
                datetime,
                event_idx: eventIndex.toNumber(),
              },
            ],
          },
        }
      );
      /* eslint-enable @typescript-eslint/naming-convention */

      let result = await assetPermissions.getOperationHistory({
        asset: ticker,
        start: new BigNumber(0),
        size: new BigNumber(1),
      });

      expect(result.next).toEqual(null);
      expect(result.count).toEqual(new BigNumber(1));
      expect(result.data).toEqual([
        {
          blockNumber: blockId,
          blockHash,
          blockDate: new Date(`${datetime}Z`),
          eventIndex,
        },
      ]);

      /* eslint-disable @typescript-eslint/naming-convention */
      dsMockUtils.createApolloQueryMock(
        tickerExternalAgentActions({
          ticker,
          caller_did: did,
          pallet_name: undefined,
          event_id: undefined,
          count: undefined,
          skip: undefined,
        }),
        {
          tickerExternalAgentActions: {
            totalCount: 0,
            items: [],
          },
        }
      );
      /* eslint-enable @typescript-eslint/naming-convention */

      result = await assetPermissions.getOperationHistory({
        asset: ticker,
      });

      expect(result.next).toEqual(null);
      expect(result.count).toEqual(new BigNumber(0));
      expect(result.data).toEqual([]);
    });

    it('should call v2 query if middlewareV2 is enabled', async () => {
      const fakeResult = 'fakeResult' as unknown as ResultSet<EventIdentifier>;
      jest.spyOn(assetPermissions, 'getOperationHistoryV2').mockResolvedValue(fakeResult);

      const result = await assetPermissions.getOperationHistory({ asset });
      expect(result).toEqual(fakeResult);
    });
  });

  describe('method: getOperationHistoryV2', () => {
    it('should return the Events triggered by Operations the Identity has performed on a specific Asset', async () => {
      const blockId = new BigNumber(1);
      const blockHash = 'someHash';
      const eventIndex = new BigNumber(1);
      const datetime = '2020-10-10';

      dsMockUtils.createApolloV2QueryMock(
        tickerExternalAgentActionsQuery(
          {
            assetId: ticker,
            callerId: did,
            palletName: undefined,
            eventId: undefined,
          },
          new BigNumber(1),
          new BigNumber(0)
        ),
        {
          tickerExternalAgentActions: {
            totalCount: 1,
            nodes: [
              {
                createdBlock: {
                  blockId: blockId.toNumber(),
                  datetime,
                  hash: blockHash,
                },
                eventIdx: eventIndex.toNumber(),
              },
            ],
          },
        }
      );

      let result = await assetPermissions.getOperationHistoryV2({
        asset: ticker,
        start: new BigNumber(0),
        size: new BigNumber(1),
      });

      expect(result.next).toEqual(null);
      expect(result.count).toEqual(new BigNumber(1));
      expect(result.data).toEqual([
        {
          blockNumber: blockId,
          blockHash,
          blockDate: new Date(`${datetime}Z`),
          eventIndex,
        },
      ]);

      dsMockUtils.createApolloV2QueryMock(
        tickerExternalAgentActionsQuery({
          assetId: ticker,
          callerId: did,
          palletName: undefined,
          eventId: undefined,
        }),
        {
          tickerExternalAgentActions: {
            totalCount: 0,
            nodes: [],
          },
        }
      );

      result = await assetPermissions.getOperationHistoryV2({
        asset: ticker,
      });

      expect(result.next).toEqual(null);
      expect(result.count).toEqual(new BigNumber(0));
      expect(result.data).toEqual([]);
    });
  });
});
