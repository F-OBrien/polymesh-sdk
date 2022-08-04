import { QueryableStorageEntry } from '@polkadot/api/types';
import BigNumber from 'bignumber.js';

import { Asset, PolymeshError, Procedure } from '~/internal';
import {
  AddClaimCountTransferRestrictionParams,
  AddClaimPercentageTransferRestrictionParams,
  AddCountTransferRestrictionParams,
  AddPercentageTransferRestrictionParams,
  ErrorCode,
  TransferRestriction,
  TransferRestrictionType,
  TxTags,
} from '~/types';
import { ProcedureAuthorization } from '~/types/internal';
import { QueryReturnType } from '~/types/utils';
import {
  complianceConditionsToBtreeSet,
  getExemptedBtreeSet,
  stringToTickerKey,
  toExemptKey,
  transferRestrictionToPolymeshTransferCondition,
  transferRestrictionTypeToStatOpType,
  u32ToBigNumber,
} from '~/utils/conversion';
import { assertStatIsSet, checkTxType, neededStatTypeForRestrictionInput } from '~/utils/internal';

/**
 * @hidden
 */
export type AddTransferRestrictionParams = { ticker: string } & (
  | AddCountTransferRestrictionParams
  | AddPercentageTransferRestrictionParams
  | AddClaimCountTransferRestrictionParams
  | AddClaimPercentageTransferRestrictionParams
);

/**
 * @hidden
 */
export async function prepareAddTransferRestriction(
  this: Procedure<AddTransferRestrictionParams, BigNumber>,
  args: AddTransferRestrictionParams
): Promise<BigNumber> {
  const {
    context: {
      polymeshApi: {
        tx: { statistics },
        query: { statistics: statisticsQuery },
        queryMulti,
        consts,
      },
    },
    context,
  } = this;
  const { ticker, exemptedIdentities = [], type } = args;
  const tickerKey = stringToTickerKey(ticker, context);

  let claimIssuer;
  if (
    type === TransferRestrictionType.ClaimCount ||
    type === TransferRestrictionType.ClaimPercentage
  ) {
    const {
      claim: { type: claimType },
      issuer,
    } = args;
    claimIssuer = { claimType, issuer };
  }

  const [currentStats, { requirements: currentRestrictions }] = await queryMulti<
    [
      QueryReturnType<typeof statisticsQuery.activeAssetStats>,
      QueryReturnType<typeof statisticsQuery.assetTransferCompliances>
    ]
  >([
    [statisticsQuery.activeAssetStats as unknown as QueryableStorageEntry<'promise'>, tickerKey],
    [
      statisticsQuery.assetTransferCompliances as unknown as QueryableStorageEntry<'promise'>,
      tickerKey,
    ],
  ]);

  const neededStat = neededStatTypeForRestrictionInput({ type, claimIssuer }, context);
  assertStatIsSet(currentStats, neededStat);
  const maxConditions = u32ToBigNumber(consts.statistics.maxTransferConditionsPerAsset);

  const restrictionAmount = new BigNumber(currentRestrictions.size);
  if (restrictionAmount.gte(maxConditions)) {
    throw new PolymeshError({
      code: ErrorCode.LimitExceeded,
      message: 'Transfer Restriction limit reached',
      data: { limit: maxConditions },
    });
  }

  let restriction: TransferRestriction;
  let claimType;

  if (type === TransferRestrictionType.Count) {
    const value = args.count;
    restriction = { type, value };
  } else if (type === TransferRestrictionType.Percentage) {
    const value = args.percentage;
    restriction = { type, value };
  } else if (type === TransferRestrictionType.ClaimCount) {
    const { min, max: maybeMax, issuer, claim } = args;
    restriction = { type, value: { min, max: maybeMax, issuer, claim } };
    claimType = claim.type;
  } else {
    const { min, max, issuer, claim } = args;
    restriction = { type, value: { min, max, issuer, claim } };
    claimType = claim.type;
  }

  const rawTransferCondition = transferRestrictionToPolymeshTransferCondition(restriction, context);
  const hasRestriction = !![...currentRestrictions].find(r => r.eq(rawTransferCondition));

  if (hasRestriction) {
    throw new PolymeshError({
      code: ErrorCode.NoDataChange,
      message: 'Cannot add the same restriction more than once',
    });
  }
  const conditions = complianceConditionsToBtreeSet(
    [...currentRestrictions, rawTransferCondition],
    context
  );

  const transactions = [];
  transactions.push(
    checkTxType({
      transaction: statistics.setAssetTransferCompliance,
      args: [tickerKey, conditions],
    })
  );

  if (exemptedIdentities.length) {
    const op = transferRestrictionTypeToStatOpType(type, context);
    const exemptedIdBtreeSet = await getExemptedBtreeSet(exemptedIdentities, ticker, context);
    const exemptKey = toExemptKey(tickerKey, op, claimType);
    transactions.push(
      checkTxType({
        transaction: statistics.setEntitiesExempt,
        feeMultiplier: new BigNumber(exemptedIdBtreeSet.size),
        args: [true, exemptKey, exemptedIdBtreeSet],
      })
    );
  }

  this.addBatchTransaction({ transactions });
  return restrictionAmount.plus(1);
}

/**
 * @hidden
 */
export function getAuthorization(
  this: Procedure<AddTransferRestrictionParams, BigNumber>,
  { ticker, exemptedIdentities = [] }: AddTransferRestrictionParams
): ProcedureAuthorization {
  const transactions = [TxTags.statistics.SetAssetTransferCompliance];

  if (exemptedIdentities.length) {
    transactions.push(TxTags.statistics.SetEntitiesExempt);
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
export const addTransferRestriction = (): Procedure<AddTransferRestrictionParams, BigNumber> =>
  new Procedure(prepareAddTransferRestriction, getAuthorization);
