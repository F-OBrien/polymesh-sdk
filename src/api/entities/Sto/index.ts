import { Option } from '@polkadot/types';
import BigNumber from 'bignumber.js';
import { Fundraiser, FundraiserName } from 'polymesh-types/types';

import {
  closeSto,
  Context,
  Entity,
  Identity,
  investInSto,
  InvestInStoParams,
  modifyStoTimes,
  ModifyStoTimesParams,
  SecurityToken,
  toggleFreezeSto,
} from '~/internal';
import { investments } from '~/middleware/queries';
import { Query } from '~/middleware/types';
import {
  NoArgsProcedureMethod,
  ProcedureMethod,
  ResultSet,
  SubCallback,
  UnsubCallback,
} from '~/types';
import { Ensured } from '~/types/utils';
import { bigNumberToU64, fundraiserToStoDetails, stringToTicker } from '~/utils/conversion';
import { calculateNextKey, createProcedureMethod, toHumanReadable } from '~/utils/internal';

import { Investment, StoDetails } from './types';

export interface UniqueIdentifiers {
  id: BigNumber;
  ticker: string;
}

interface HumanReadable {
  id: string;
  ticker: string;
}

/**
 * Represents a Security Token Offering in the Polymesh blockchain
 */
export class Sto extends Entity<UniqueIdentifiers, HumanReadable> {
  /**
   * @hidden
   * Check if a value is of type [[UniqueIdentifiers]]
   */
  public static isUniqueIdentifiers(identifier: unknown): identifier is UniqueIdentifiers {
    const { id, ticker } = identifier as UniqueIdentifiers;

    return id instanceof BigNumber && typeof ticker === 'string';
  }

  /**
   * identifier number of the Offering
   */
  public id: BigNumber;

  /**
   * Security Token being offered
   */
  public token: SecurityToken;

  /**
   * @hidden
   */
  public constructor(identifiers: UniqueIdentifiers, context: Context) {
    super(identifiers, context);

    const { id, ticker } = identifiers;

    this.id = id;
    this.token = new SecurityToken({ ticker }, context);

    this.freeze = createProcedureMethod(
      {
        getProcedureAndArgs: () => [toggleFreezeSto, { ticker, id, freeze: true }],
        voidArgs: true,
      },
      context
    );
    this.unfreeze = createProcedureMethod(
      {
        getProcedureAndArgs: () => [toggleFreezeSto, { ticker, id, freeze: false }],
        voidArgs: true,
      },
      context
    );
    this.close = createProcedureMethod(
      { getProcedureAndArgs: () => [closeSto, { ticker, id }], voidArgs: true },
      context
    );
    this.modifyTimes = createProcedureMethod(
      { getProcedureAndArgs: args => [modifyStoTimes, { ticker, id, ...args }] },
      context
    );
    this.invest = createProcedureMethod(
      { getProcedureAndArgs: args => [investInSto, { ticker, id, ...args }] },
      context
    );
  }

  /**
   * Retrieve the STO's details
   *
   * @note can be subscribed to
   */
  public details(): Promise<StoDetails>;
  public details(callback: SubCallback<StoDetails>): Promise<UnsubCallback>;

  // eslint-disable-next-line require-jsdoc
  public async details(callback?: SubCallback<StoDetails>): Promise<StoDetails | UnsubCallback> {
    const {
      context: {
        polymeshApi: {
          query: { sto },
        },
      },
      id,
      token: { ticker },
      context,
    } = this;

    const assembleResult = (
      rawFundraiser: Option<Fundraiser>,
      rawName: FundraiserName
    ): StoDetails => fundraiserToStoDetails(rawFundraiser.unwrap(), rawName, context);

    const rawTicker = stringToTicker(ticker, context);
    const rawU64 = bigNumberToU64(id, context);

    const fetchName = (): Promise<FundraiserName> => sto.fundraiserNames(rawTicker, rawU64);

    if (callback) {
      const fundraiserName = await fetchName();
      return sto.fundraisers(rawTicker, rawU64, fundraiserData => {
        callback(assembleResult(fundraiserData, fundraiserName));
      });
    }

    const [fundraiser, name] = await Promise.all([sto.fundraisers(rawTicker, rawU64), fetchName()]);

    return assembleResult(fundraiser, name);
  }

  /**
   * Close the STO
   */
  public close: NoArgsProcedureMethod<void>;

  /**
   * Freeze the STO
   */
  public freeze: NoArgsProcedureMethod<Sto>;

  /**
   * Unfreeze the STO
   */
  public unfreeze: NoArgsProcedureMethod<Sto>;

  /**
   * Modify the start/end time of the STO
   *
   * @throws if:
   *   - Trying to modify the start time on an STO that already started
   *   - Trying to modify anything on an STO that already ended
   *   - Trying to change start or end time to a past date
   */
  public modifyTimes: ProcedureMethod<ModifyStoTimesParams, void>;

  /**
   * Invest in the STO
   *
   * @note required roles:
   *   - Purchase Portfolio Custodian
   *   - Funding Portfolio Custodian
   */
  public invest: ProcedureMethod<InvestInStoParams, void>;

  /**
   * Retrieve all investments made on this STO
   *
   * @param opts.size - page size
   * @param opts.start - page offset
   *
   * @note supports pagination
   * @note uses the middleware
   */
  public async getInvestments(
    opts: {
      size?: BigNumber;
      start?: BigNumber;
    } = {}
  ): Promise<ResultSet<Investment>> {
    const {
      context,
      id,
      token: { ticker },
    } = this;

    const { size, start } = opts;

    const result = await context.queryMiddleware<Ensured<Query, 'investments'>>(
      investments({
        stoId: id.toNumber(),
        ticker: ticker,
        count: size?.toNumber(),
        skip: start?.toNumber(),
      })
    );

    const {
      data: { investments: investmentsResult },
    } = result;

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const { items, totalCount } = investmentsResult!;

    const count = new BigNumber(totalCount);

    const data: Investment[] = [];

    items!.forEach(item => {
      const { investor: did, offeringTokenAmount, raiseTokenAmount } = item!;

      data.push({
        investor: new Identity({ did }, context),
        soldAmount: new BigNumber(offeringTokenAmount).shiftedBy(-6),
        investedAmount: new BigNumber(raiseTokenAmount).shiftedBy(-6),
      });
    });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */

    const next = calculateNextKey(count, size, start);

    return {
      data,
      next,
      count,
    };
  }

  /**
   * Determine whether this STO exists on chain
   */
  public async exists(): Promise<boolean> {
    const {
      token: { ticker },
      id,
      context,
    } = this;

    const fundraiser = await context.polymeshApi.query.sto.fundraisers(
      stringToTicker(ticker, context),
      bigNumberToU64(id, context)
    );

    return fundraiser.isSome;
  }

  /**
   * Return the Sto's ID and Token ticker
   */
  public toJson(): HumanReadable {
    const { token, id } = this;

    return toHumanReadable({
      ticker: token,
      id,
    });
  }
}
