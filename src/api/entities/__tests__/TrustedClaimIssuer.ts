import { Entity } from '~/base';
import { Context } from '~/context';
import { eventByIndexedArgs } from '~/middleware/queries';
import { dsMockUtils } from '~/testUtils/mocks';
import * as utilsModule from '~/utils';
import { MAX_TICKER_LENGTH } from '~/utils/constants';

import { Identity } from '../Identity';
import { TrustedClaimIssuer } from '../TrustedClaimIssuer';

describe('TrustedClaimIssuer class', () => {
  let context: Context;

  beforeAll(() => {
    dsMockUtils.initMocks();
  });

  beforeEach(() => {
    context = dsMockUtils.getContextInstance();
  });

  afterEach(() => {
    dsMockUtils.reset();
  });

  afterAll(() => {
    dsMockUtils.cleanup();
  });

  test('should extend entity', () => {
    expect(TrustedClaimIssuer.prototype instanceof Entity).toBe(true);
  });

  describe('constructor', () => {
    test('should assign ticker and identity to instance', () => {
      const did = 'someDid';
      const ticker = 'SOMETICKER';
      const identity = new Identity({ did }, context);
      const trustedClaimIssuer = new TrustedClaimIssuer({ claimIssuerDid: did, ticker }, context);

      expect(trustedClaimIssuer.ticker).toBe(ticker);
      expect(trustedClaimIssuer.identity).toEqual(identity);
    });
  });

  describe('method: isUniqueIdentifiers', () => {
    test('should return true if the object conforms to the interface', () => {
      expect(TrustedClaimIssuer.isUniqueIdentifiers({ claimIssuerDid: 'someDid' })).toBe(true);
      expect(TrustedClaimIssuer.isUniqueIdentifiers({})).toBe(false);
      expect(TrustedClaimIssuer.isUniqueIdentifiers({ claimIssuerDid: 1 })).toBe(false);
    });
  });

  describe('method: addedAt', () => {
    const claimIssuerDid = 'someDid';
    const ticker = 'SOMETICKER';
    const variables = {
      moduleId: 'complianceManager',
      eventId: 'TrustedDefaultClaimIssuerAdded',
      eventArg1: utilsModule.padString(ticker, MAX_TICKER_LENGTH),
      eventArg2: claimIssuerDid,
    };

    test('should return the event identifier object of the trusted claim issuer creation', async () => {
      const blockId = 1234;
      const blockDatetime = new Date('4/14/2020');
      const eventIdx = 1;
      const fakeResult = { blockNumber: blockId, blockDatetime, eventIndex: eventIdx };
      const trustedClaimIssuer = new TrustedClaimIssuer({ claimIssuerDid, ticker }, context);

      dsMockUtils.createApolloQueryStub(eventByIndexedArgs(variables), {
        /* eslint-disable @typescript-eslint/camelcase */
        eventByIndexedArgs: {
          block_id: blockId,
          block: { datetime: blockDatetime },
          event_idx: eventIdx,
        },
        /* eslint-enable @typescript-eslint/camelcase */
      });

      const result = await trustedClaimIssuer.addedAt();

      expect(result).toEqual(fakeResult);
    });

    test('should return null if the query result is empty', async () => {
      const trustedClaimIssuer = new TrustedClaimIssuer({ claimIssuerDid, ticker }, context);

      dsMockUtils.createApolloQueryStub(eventByIndexedArgs(variables), {});
      const result = await trustedClaimIssuer.addedAt();
      expect(result).toBeNull();
    });

    test('should throw if the middleware query fails', async () => {
      const trustedClaimIssuer = new TrustedClaimIssuer({ claimIssuerDid, ticker }, context);

      dsMockUtils.throwOnMiddlewareQuery();

      return expect(trustedClaimIssuer.addedAt()).rejects.toThrow(
        'Error in middleware query: Error'
      );
    });
  });
});
