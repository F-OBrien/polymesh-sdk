import { KeyringPair } from '@polkadot/keyring/types';
import stringToU8a from '@polkadot/util/string/toU8a';
import { ApiPromise, Keyring } from '@polymathnetwork/polkadot/api';
import { IdentityId } from '@polymathnetwork/polkadot/types/interfaces';

import { PolymeshError } from '~/base/PolymeshError';
import { ErrorCode } from '~/types';

import { Identity } from './api/entities/Identity';

interface BuildParams {
  polymeshApi: ApiPromise;
  accountSeed?: string | undefined;
}

interface SignerData {
  currentPair: KeyringPair;
  did: IdentityId;
}

interface ConstructorParams {
  polymeshApi: ApiPromise;
  keyring: Keyring;
  pair?: SignerData;
}

interface AccountData {
  address: string;
  name?: string;
}

/**
 * Context in which the SDK is being used
 *
 * - Holds the current low level API
 * - Holds the current keyring pair
 * - Holds the current Identity
 */
export class Context {
  private keyring: Keyring;

  public polymeshApi: ApiPromise;

  public currentPair?: KeyringPair;

  public currentIdentity?: Identity;

  /**
   * @hidden
   */
  private constructor(params: ConstructorParams) {
    const { polymeshApi, keyring, pair } = params;

    this.polymeshApi = polymeshApi;
    this.keyring = keyring;

    if (pair) {
      this.currentPair = pair.currentPair;
      this.currentIdentity = new Identity({ did: pair.did.toString() }, this);
    }
  }

  /**
   * Create the Context instance
   */
  static async create(params: BuildParams): Promise<Context> {
    const { polymeshApi, accountSeed } = params;

    const keyring = new Keyring({ type: 'sr25519' });

    if (accountSeed) {
      if (accountSeed.length !== 32) {
        throw new PolymeshError({
          code: ErrorCode.ValidationError,
          message: 'Seed must be 32 characters in length',
        });
      }

      const currentPair = keyring.addFromSeed(stringToU8a(accountSeed));
      const keyToIdentityIds = await polymeshApi.query.identity.keyToIdentityIds(
        currentPair.publicKey
      );
      let did: IdentityId;
      try {
        did = keyToIdentityIds.unwrap().asUnique;
      } catch (e) {
        throw new PolymeshError({
          code: ErrorCode.FatalError,
          message: 'Identity ID does not exist',
        });
      }

      return new Context({ polymeshApi, keyring, pair: { currentPair, did } });
    }
    return new Context({ polymeshApi, keyring });
  }

  /**
   * Retrieve a list of addresses associated with the account
   */
  public getAccounts = (): Array<AccountData> => {
    const { keyring } = this;
    return keyring.getPairs().map(({ address, meta }) => {
      return { address, name: meta.name };
    });
  };

  /**
   * Set a pair as a current account keyring pair
   */
  public setPair = (address: string): void => {
    const { keyring } = this;
    try {
      this.currentPair = keyring.getPair(address);
    } catch (e) {
      throw new PolymeshError({
        code: ErrorCode.FatalError,
        message: 'The address is not present in the keyring set',
      });
    }
  };
}
