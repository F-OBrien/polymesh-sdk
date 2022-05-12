import {
  BTreeSetStatType,
  PolymeshPrimitivesTransferComplianceTransferCondition,
} from '@polkadot/types/lookup';
import BigNumber from 'bignumber.js';
import { TransferCondition, TxTag, TxTags } from 'polymesh-types/types';

import { Asset, Context, Identity, PolymeshError, Procedure } from '~/internal';
import {
  CountTransferRestrictionInput,
  ErrorCode,
  PercentageTransferRestrictionInput,
  TransferRestriction,
  TransferRestrictionType,
} from '~/types';
import { ProcedureAuthorization, StatisticsOpType } from '~/types/internal';
import {
  bigNumberToU128,
  complianceRequirementsToBtreeSet,
  meshStatToStatisticsOpType,
  permillToBigNumber,
  primitive2ndKey,
  scopeIdsToBtreeSetIdentityId,
  statisticsOpTypeToStatOpType,
  statisticsOpTypeToStatType,
  statUpdate,
  statUpdatesToBtreeStatUpdate,
  stringToIdentityId,
  stringToTickerKey,
  transferRestrictionToPolymeshTransferCondition,
  u32ToBigNumber,
  u64ToBigNumber,
} from '~/utils/conversion';
import { checkTxType, getExemptedIds } from '~/utils/internal';

export interface SetCountTransferRestrictionsParams {
  /**
   * array of Count Transfer Restrictions with their corresponding exemptions (if applicable)
   */
  restrictions: CountTransferRestrictionInput[];
  type: TransferRestrictionType.Count;
}

export interface SetPercentageTransferRestrictionsParams {
  /**
   * array of Percentage Transfer Restrictions with their corresponding exemptions (if applicable)
   */
  restrictions: PercentageTransferRestrictionInput[];
  type: TransferRestrictionType.Percentage;
}

export type SetTransferRestrictionsParams = { ticker: string } & (
  | SetCountTransferRestrictionsParams
  | SetPercentageTransferRestrictionsParams
);

/**
 * @hidden
 */
export interface Storage {
  currentRestrictions: TransferCondition[];
  occupiedSlots: BigNumber;
  needStat: boolean;
  currentStats: BTreeSetStatType;
}

/**
 * @hidden
 */
function isSameCondition(
  transferCondition: TransferCondition,
  inputCondition: CountTransferRestrictionInput | PercentageTransferRestrictionInput,
  type: TransferRestrictionType
): boolean {
  if (transferCondition.isMaxInvestorCount && type === TransferRestrictionType.Count) {
    const currentCount = u64ToBigNumber(transferCondition.asMaxInvestorCount);
    return currentCount.eq((inputCondition as CountTransferRestrictionInput).count);
  } else if (
    transferCondition.isMaxInvestorOwnership &&
    type === TransferRestrictionType.Percentage
  ) {
    const currentOwnership = permillToBigNumber(transferCondition.asMaxInvestorOwnership);
    return currentOwnership.eq((inputCondition as PercentageTransferRestrictionInput).percentage);
  } else {
    return false;
  }
}

/**
 * @hidden
 */
function transformRestrictions(
  restrictions: CountTransferRestrictionInput[] | PercentageTransferRestrictionInput[],
  currentRestrictions: TransferCondition[],
  type: TransferRestrictionType,
  context: Context
): [PolymeshPrimitivesTransferComplianceTransferCondition[], (string | Identity)[]] {
  const exemptions: (string | Identity)[] = [];

  let someDifference = restrictions.length !== currentRestrictions.length;
  const conditions = restrictions.map(r => {
    const compareConditions = (transferCondition: TransferCondition) =>
      isSameCondition(transferCondition, r, type);
    if (!someDifference) {
      someDifference = !currentRestrictions.find(compareConditions);
    }
    let condition: TransferRestriction;
    if (type === TransferRestrictionType.Count) {
      condition = { type, value: (r as CountTransferRestrictionInput).count };
    } else {
      condition = { type, value: (r as PercentageTransferRestrictionInput).percentage };
    }

    const rawCondition = transferRestrictionToPolymeshTransferCondition(condition, context);

    if (r.exemptedIdentities) {
      r.exemptedIdentities.forEach(e => {
        exemptions.push(e);
      });
    }

    return rawCondition;
  });

  if (!someDifference) {
    throw new PolymeshError({
      code: ErrorCode.NoDataChange,
      message: restrictions.length
        ? 'The supplied restrictions are already in place'
        : 'There are no restrictions to remove',
    });
  }

  return [conditions, exemptions];
}

/**
 * @hidden
 */
export async function prepareSetTransferRestrictions(
  this: Procedure<SetTransferRestrictionsParams, BigNumber, Storage>,
  args: SetTransferRestrictionsParams
): Promise<BigNumber> {
  const {
    context: {
      polymeshApi: {
        tx: { statistics },
        query,
        consts,
      },
    },
    storage: { currentRestrictions, occupiedSlots, needStat, currentStats },
    context,
  } = this;
  const {
    restrictions: { length: newRestrictionAmount },
    restrictions,
    type,
    ticker,
  } = args;
  const tickerKey = stringToTickerKey(ticker, context);

  const [conditions, exemptions] = transformRestrictions(
    restrictions,
    currentRestrictions,
    type,
    context
  );

  const maxTransferConditions = u32ToBigNumber(consts.statistics.maxTransferConditionsPerAsset);
  const finalCount = occupiedSlots.plus(newRestrictionAmount);
  if (finalCount.gte(maxTransferConditions)) {
    throw new PolymeshError({
      code: ErrorCode.LimitExceeded,
      message: 'Cannot set more Transfer Restrictions than there are slots available',
      data: {
        availableSlots: maxTransferConditions.minus(occupiedSlots),
      },
    });
  }

  const transactions = [];

  const op =
    type === TransferRestrictionType.Count
      ? statisticsOpTypeToStatOpType(StatisticsOpType.Count, context)
      : statisticsOpTypeToStatOpType(StatisticsOpType.Balance, context);

  if (needStat) {
    const newStat = statisticsOpTypeToStatType(op, context);
    currentStats.push(newStat);
    currentStats.sort().reverse();

    transactions.push(
      checkTxType({
        transaction: statistics.setActiveAssetStats,
        args: [tickerKey, currentStats],
      })
    );

    // Count stats need to be initialized manually
    if (type === TransferRestrictionType.Count) {
      const { Ticker: rawTicker } = tickerKey;
      const holders = await query.asset.balanceOf.entries(rawTicker);
      const holderCount = new BigNumber(holders.length);
      const secondKey = primitive2ndKey(context);
      const stat = statUpdate(secondKey, bigNumberToU128(holderCount, context), context);
      const statValue = statUpdatesToBtreeStatUpdate([stat]);

      transactions.push(
        checkTxType({
          transaction: statistics.batchUpdateAssetStats,
          args: [tickerKey, newStat, statValue],
        })
      );
    }
  }

  transactions.push(
    checkTxType({
      transaction: statistics.setAssetTransferCompliance,
      args: [tickerKey, complianceRequirementsToBtreeSet(conditions)],
    })
  );

  if (exemptions.length) {
    const exemptedIds = await getExemptedIds(exemptions, context, ticker);
    const exemptedScopeIds = exemptedIds.map(entityId => stringToIdentityId(entityId, context));
    const btreeIds = scopeIdsToBtreeSetIdentityId(exemptedScopeIds, context);
    transactions.push(
      checkTxType({
        transaction: statistics.setEntitiesExempt,
        feeMultiplier: new BigNumber(exemptions.length),
        args: [true, { asset: tickerKey, op }, btreeIds],
      })
    );
  }
  this.addBatchTransaction({ transactions });
  return finalCount;
}

/**
 * @hidden
 */
export function getAuthorization(
  this: Procedure<SetTransferRestrictionsParams, BigNumber, Storage>,
  { ticker }: SetTransferRestrictionsParams
): ProcedureAuthorization {
  const { needStat } = this.storage;

  const transactions: TxTag[] = [
    TxTags.statistics.SetAssetTransferCompliance,
    TxTags.statistics.SetEntitiesExempt,
  ];

  if (needStat) {
    transactions.push(TxTags.statistics.SetActiveAssetStats);
  }

  return {
    permissions: {
      assets: [new Asset({ ticker }, this.context)],
      transactions,
      portfolios: [],
    },
  };
}

/**
 * @hidden
 */
export async function prepareStorage(
  this: Procedure<SetTransferRestrictionsParams, BigNumber, Storage>,
  args: SetTransferRestrictionsParams
): Promise<Storage> {
  const {
    context,
    context: {
      polymeshApi: {
        query: { statistics },
      },
    },
  } = this;
  const { ticker, type } = args;

  const tickerKey = stringToTickerKey(ticker, context);

  const currentStats = await statistics.activeAssetStats(tickerKey);
  const needStat = !currentStats.find(s => {
    const stat = meshStatToStatisticsOpType(s);
    const cmpStat =
      stat === StatisticsOpType.Balance
        ? TransferRestrictionType.Percentage
        : TransferRestrictionType.Count;
    return cmpStat === type;
  });

  const {
    transferRestrictions: { count, percentage },
  } = new Asset({ ticker }, context);

  const [
    { restrictions: currentCountRestrictions },
    { restrictions: currentPercentageRestrictions },
  ] = await Promise.all([count.get(), percentage.get()]);

  const currentRestrictions: TransferRestriction[] = [];

  // take the count of the type of restrictions not being changed
  const occupiedSlots =
    type === TransferRestrictionType.Percentage
      ? currentCountRestrictions.length
      : currentPercentageRestrictions.length;

  if (type === TransferRestrictionType.Count) {
    currentCountRestrictions.forEach(({ count: value }) => {
      const restriction = { type: TransferRestrictionType.Count, value };
      currentRestrictions.push(restriction);
    });
  } else {
    currentPercentageRestrictions.forEach(({ percentage: value }) => {
      const restriction = { type: TransferRestrictionType.Percentage, value };
      currentRestrictions.push(restriction);
    });
  }

  const transformRestriction = (restriction: TransferRestriction): TransferCondition =>
    transferRestrictionToPolymeshTransferCondition(restriction, context);

  return {
    occupiedSlots: new BigNumber(occupiedSlots),
    currentRestrictions: currentRestrictions.map(transformRestriction),
    needStat,
    currentStats,
  };
}

/**
 * @hidden
 */
export const setTransferRestrictions = (): Procedure<
  SetTransferRestrictionsParams,
  BigNumber,
  Storage
> => new Procedure(prepareSetTransferRestrictions, getAuthorization, prepareStorage);
