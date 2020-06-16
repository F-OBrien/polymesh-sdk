import { ApiPromise, WsProvider } from '@polkadot/api';
import { Signer } from '@polkadot/api/types';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { polymesh } from 'polymesh-types/definitions';

import { Identity, SecurityToken, TickerReservation } from '~/api/entities';
import {
  modifyClaims,
  ModifyClaimsParams,
  reserveTicker,
  ReserveTickerParams,
  transferPolyX,
  TransferPolyXParams,
} from '~/api/procedures';
import { PolymeshError, TransactionQueue } from '~/base';
import { Context } from '~/context';
import { didsWithClaims } from '~/harvester/queries';
import { Query } from '~/harvester/types';
import {
  AccountBalance,
  ClaimData,
  CommonKeyring,
  Ensured,
  ErrorCode,
  HarvesterConfig,
  SubCallback,
  UiKeyring,
  UnsubCallback,
} from '~/types';
import { ClaimOperation, SignerType } from '~/types/internal';
import {
  createClaim,
  signerToSignatory,
  stringToTicker,
  tickerToString,
  valueToDid,
} from '~/utils';

interface ConnectParamsBase {
  nodeUrl: string;
  signer?: Signer;
  harvester?: HarvesterConfig;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @hidden
 */
function isUiKeyring(keyring: any): keyring is UiKeyring {
  return !!keyring.keyring;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Main entry point of the Polymesh SDK
 */
export class Polymesh {
  public context: Context = {} as Context;

  /**
   * @hidden
   */
  private constructor(context: Context) {
    this.context = context;
  }

  static async connect(params: ConnectParamsBase & { accountSeed: string }): Promise<Polymesh>;

  static async connect(
    params: ConnectParamsBase & {
      keyring: CommonKeyring | UiKeyring;
    }
  ): Promise<Polymesh>;

  static async connect(params: ConnectParamsBase & { accountUri: string }): Promise<Polymesh>;

  static async connect(params: ConnectParamsBase): Promise<Polymesh>;

  /**
   * Create the instance and connect to the Polymesh node
   */
  static async connect(
    params: ConnectParamsBase & {
      accountSeed?: string;
      keyring?: CommonKeyring | UiKeyring;
      accountUri?: string;
      harvester?: HarvesterConfig;
    }
  ): Promise<Polymesh> {
    const { nodeUrl, accountSeed, keyring, accountUri, signer, harvester } = params;
    let polymeshApi: ApiPromise;
    let harvesterClient: ApolloClient<NormalizedCacheObject> | null = null;

    try {
      const { types, rpc } = polymesh;

      polymeshApi = await ApiPromise.create({
        provider: new WsProvider(nodeUrl),
        types,
        rpc,
      });

      if (harvester) {
        harvesterClient = new ApolloClient({
          link: setContext((_, { headers }) => {
            return {
              headers: {
                ...headers,
                'x-api-key': harvester.key,
              },
            };
          }).concat(
            ApolloLink.from([
              new HttpLink({
                uri: harvester.link,
              }),
            ])
          ),
          cache: new InMemoryCache(),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'no-cache',
            },
            query: {
              fetchPolicy: 'no-cache',
            },
          },
        });
      }

      if (signer) {
        polymeshApi.setSigner(signer);
      }

      let context: Context;

      if (accountSeed) {
        context = await Context.create({
          polymeshApi,
          harvesterClient,
          seed: accountSeed,
        });
      } else if (keyring) {
        let keyringInstance: CommonKeyring;
        if (isUiKeyring(keyring)) {
          keyringInstance = keyring.keyring;
        } else {
          keyringInstance = keyring;
        }
        context = await Context.create({
          polymeshApi,
          harvesterClient,
          keyring: keyringInstance,
        });
      } else if (accountUri) {
        context = await Context.create({
          polymeshApi,
          harvesterClient,
          uri: accountUri,
        });
      } else {
        context = await Context.create({
          polymeshApi,
          harvesterClient,
        });
      }

      return new Polymesh(context);
    } catch (e) {
      throw new PolymeshError({
        code: ErrorCode.FatalError,
        message: `Error while connecting to "${nodeUrl}": "${e.message}"`,
      });
    }
  }

  /**
   * Transfer an amount of POLYX to a specified account
   *
   * @param args.to - account id that will receive the POLYX
   * @param args.amount - amount of POLYX to be transferred
   */
  public transferPolyX(args: TransferPolyXParams): Promise<TransactionQueue<void>> {
    return transferPolyX.prepare(args, this.context);
  }

  // TODO: uncomment for v2
  /*
   * Get the POLYX balance of the current account
   * NOTE: We don't expose this method for Testnet v1
   */
  /*
  public getIdentityBalance(): Promise<BigNumber> {
    return this.context.getCurrentIdentity().getPolyXBalance();
  }
  */

  /**
   * Get the free/locked POLYX balance of an account
   *
   * @param args.accountId - defaults to the current account
   *
   * @note can be subscribed to
   */
  public getAccountBalance(args?: { accountId: string }): Promise<AccountBalance>;
  public getAccountBalance(callback: SubCallback<AccountBalance>): Promise<UnsubCallback>;
  public getAccountBalance(
    args: { accountId: string },
    callback: SubCallback<AccountBalance>
  ): Promise<UnsubCallback>;

  // eslint-disable-next-line require-jsdoc
  public getAccountBalance(
    args?: { accountId: string } | SubCallback<AccountBalance>,
    callback?: SubCallback<AccountBalance>
  ): Promise<AccountBalance | UnsubCallback> {
    const { context } = this;
    let accountId: string | undefined;
    let cb: SubCallback<AccountBalance> | undefined = callback;

    switch (typeof args) {
      case 'undefined': {
        break;
      }
      case 'function': {
        cb = args;
        break;
      }
      default: {
        ({ accountId } = args);
        break;
      }
    }

    if (cb) {
      return context.accountBalance(accountId, cb);
    }

    return context.accountBalance(accountId);
  }

  /**
   * Reserve a ticker symbol to later use in the creation of a Security Token.
   * The ticker will expire after a set amount of time, after which other users can reserve it
   *
   * @param args.ticker - ticker symbol to reserve
   */
  public reserveTicker(args: ReserveTickerParams): Promise<TransactionQueue<TickerReservation>> {
    return reserveTicker.prepare(args, this.context);
  }

  /**
   * Retrieve all the ticker reservations currently owned by an identity. This includes
   * Security Tokens that have already been launched
   *
   * @param args.did - identity representation or identity ID as stored in the blockchain
   */
  public async getTickerReservations(args?: {
    did: string | Identity;
  }): Promise<TickerReservation[]> {
    const {
      context: {
        polymeshApi: {
          query: {
            identity: { links },
          },
        },
      },
      context,
    } = this;

    let identity: string;

    if (args) {
      identity = valueToDid(args.did);
    } else {
      identity = context.getCurrentIdentity().did;
    }

    const tickers = await links.entries(
      signerToSignatory({ type: SignerType.Identity, value: identity }, context)
    );

    const tickerReservations = tickers
      .filter(([, data]) => data.link_data.isTickerOwned)
      .map(([, data]) => {
        const ticker = data.link_data.asTickerOwned;
        return new TickerReservation({ ticker: tickerToString(ticker) }, context);
      });

    return tickerReservations;
  }

  /**
   * Retrieve a Ticker Reservation
   *
   * @param args.ticker - Security Token ticker
   */
  public async getTickerReservation(args: { ticker: string }): Promise<TickerReservation> {
    const { ticker } = args;
    const {
      context: {
        polymeshApi: {
          query: { asset },
        },
      },
      context,
    } = this;

    const tickerReservation = await asset.tickers(stringToTicker(ticker, context));

    if (!tickerReservation.owner.isEmpty) {
      return new TickerReservation({ ticker }, context);
    }

    throw new PolymeshError({
      code: ErrorCode.FatalError,
      message: `There is no reservation for ${ticker} ticker`,
    });
  }

  /**
   * Create an identity instance from a DID. If no DID is passed, the current identity is returned
   */
  public getIdentity(args?: { did: string }): Identity {
    if (args) {
      return new Identity(args, this.context);
    }
    return this.context.getCurrentIdentity();
  }

  /**
   * Add claims to identities
   *
   * @param args.claims - array of claims to be added
   */
  public addClaims(args: Omit<ModifyClaimsParams, 'operation'>): Promise<TransactionQueue<void>> {
    return modifyClaims.prepare({ ...args, operation: ClaimOperation.Add }, this.context);
  }

  /**
   * Edit claims associated to identities (only the expiry date can be modified)
   *
   * * @param args.claims - array of claims to be edited
   */
  public editClaims(args: Omit<ModifyClaimsParams, 'operation'>): Promise<TransactionQueue<void>> {
    return modifyClaims.prepare({ ...args, operation: ClaimOperation.Edit }, this.context);
  }

  /**
   * Revoke claims from identities
   *
   * @param args.claims - array of claims to be revoked
   */
  public revokeClaims(
    args: Omit<ModifyClaimsParams, 'operation'>
  ): Promise<TransactionQueue<void>> {
    return modifyClaims.prepare({ ...args, operation: ClaimOperation.Revoke }, this.context);
  }

  /**
   * Handle connection errors
   *
   * @returns an unsubscribe callback
   */
  public onConnectionError(callback: (...args: unknown[]) => unknown): () => void {
    const {
      context: { polymeshApi },
    } = this;

    polymeshApi.on('error', callback);

    return (): void => {
      polymeshApi.off('error', callback);
    };
  }

  /**
   * Handle disconnection
   *
   * @returns an unsubscribe callback
   */
  public onDisconnect(callback: (...args: unknown[]) => unknown): () => void {
    const {
      context: { polymeshApi },
    } = this;

    polymeshApi.on('disconnected', callback);

    return (): void => {
      polymeshApi.off('disconnected', callback);
    };
  }

  /**
   * Retrieve all the Security Tokens owned by an identity
   *
   * @param args.did - identity representation or identity ID as stored in the blockchain
   */
  public async getSecurityTokens(args?: { did: string | Identity }): Promise<SecurityToken[]> {
    const {
      context: {
        polymeshApi: {
          query: {
            identity: { links },
          },
        },
      },
      context,
    } = this;

    let identity: string;

    if (args) {
      identity = valueToDid(args.did);
    } else {
      identity = context.getCurrentIdentity().did;
    }

    const identityLinks = await links.entries(
      signerToSignatory({ type: SignerType.Identity, value: identity }, context)
    );

    const securityTokens = identityLinks
      .filter(([, data]) => data.link_data.isAssetOwned)
      .map(([, data]) => {
        const ticker = data.link_data.asAssetOwned;
        return new SecurityToken({ ticker: tickerToString(ticker) }, context);
      });

    return securityTokens;
  }

  /**
   * Retrieve a Security Token
   *
   * @param args.ticker - Security Token ticker
   */
  public async getSecurityToken(args: { ticker: string }): Promise<SecurityToken> {
    const { ticker } = args;
    const {
      context: {
        polymeshApi: {
          query: { asset },
        },
      },
      context,
    } = this;

    const securityToken = await asset.tokens(stringToTicker(ticker, context));

    if (!securityToken.owner_did.isEmpty) {
      return new SecurityToken({ ticker }, context);
    }

    throw new PolymeshError({
      code: ErrorCode.FatalError,
      message: `There is no Security Token with ticker "${ticker}"`,
    });
  }

  /**
   * Retrieve all claims issued by the current identity
   */
  public async getIssuedClaims(): Promise<ClaimData[]> {
    const {
      context,
      context: { harvesterClient },
    } = this;

    const { did } = context.getCurrentIdentity();

    let result: ApolloQueryResult<Ensured<Query, 'didsWithClaims'>>;
    try {
      result = await harvesterClient.query<Ensured<Query, 'didsWithClaims'>>(
        didsWithClaims({
          trustedClaimIssuers: [did],
          count: 100,
        })
      );
    } catch (e) {
      throw new PolymeshError({
        code: ErrorCode.FatalError,
        message: `Error in harvester query: ${e.message}`,
      });
    }

    const {
      data: { didsWithClaims: didsWithClaimsList },
    } = result;
    const claimData: ClaimData[] = [];

    didsWithClaimsList.forEach(({ claims }) => {
      claims.forEach(
        ({ targetDID, issuer, issuance_date: issuanceDate, expiry, type, jurisdiction, scope }) => {
          claimData.push({
            target: new Identity({ did: targetDID }, context),
            issuer: new Identity({ did: issuer }, context),
            issuedAt: new Date(issuanceDate),
            expiry: expiry ? new Date(expiry) : null,
            claim: createClaim(type, jurisdiction, scope),
          });
        }
      );
    });

    return claimData;
  }

  // TODO @monitz87: remove when the dApp team no longer needs it
  /* istanbul ignore next: only for testing purposes */
  /**
   * Polkadot client
   */
  public get _polkadotApi(): ApiPromise {
    return this.context.polymeshApi;
  }
}
