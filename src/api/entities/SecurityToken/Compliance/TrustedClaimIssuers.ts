import { IdentityId } from 'polymesh-types/types';

import { TrustedClaimIssuer } from '~/api/entities/TrustedClaimIssuer';
import { setTokenTrustedClaimIssuers, SetTokenTrustedClaimIssuersParams } from '~/api/procedures';
import { Namespace, TransactionQueue } from '~/base';
import { SubCallback, UnsubCallback } from '~/types';
import { identityIdToString, stringToTicker } from '~/utils';

import { SecurityToken } from '../';

/**
 * Handles all Security Token Default Trusted Claim Issuers related functionality
 */
export class TrustedClaimIssuers extends Namespace<SecurityToken> {
  /**
   * Assign a new default list of trusted claim issuers to the Security Token by replacing the existing ones with the list passed as a parameter
   *
   * This requires two transactions
   *
   * @param args.claimIssuerDids - array if identity IDs of the default claim issuers
   */
  public set(args: SetTokenTrustedClaimIssuersParams): Promise<TransactionQueue<SecurityToken>> {
    const {
      parent: { ticker },
      context,
    } = this;
    return setTokenTrustedClaimIssuers.prepare({ ticker, ...args }, context);
  }

  /**
   * Retrieve the current default trusted claim issuers of the Security Token
   *
   * @note can be subscribed to
   */
  public get(): Promise<TrustedClaimIssuer[]>;
  public get(callback: SubCallback<TrustedClaimIssuer[]>): Promise<UnsubCallback>;

  // eslint-disable-next-line require-jsdoc
  public async get(
    callback?: SubCallback<TrustedClaimIssuer[]>
  ): Promise<TrustedClaimIssuer[] | UnsubCallback> {
    const {
      context: {
        polymeshApi: {
          query: { complianceManager },
        },
      },
      context,
      parent: { ticker },
    } = this;

    const rawTicker = stringToTicker(ticker, context);

    const assembleResult = (issuers: IdentityId[]): TrustedClaimIssuer[] =>
      issuers.map(
        claimIssuer =>
          new TrustedClaimIssuer({ did: identityIdToString(claimIssuer), ticker }, context)
      );

    if (callback) {
      return complianceManager.trustedClaimIssuer(rawTicker, issuers => {
        callback(assembleResult(issuers));
      });
    }

    const claimIssuers = await complianceManager.trustedClaimIssuer(rawTicker);

    return assembleResult(claimIssuers);
  }
}
