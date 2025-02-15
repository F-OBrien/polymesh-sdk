import { Asset, PolymeshError, Procedure } from '~/internal';
import { ErrorCode, TxTags } from '~/types';
import { ExtrinsicParams, ProcedureAuthorization, TransactionSpec } from '~/types/internal';
import { boolToBoolean, stringToTicker } from '~/utils/conversion';

export interface TogglePauseRequirementsParams {
  pause: boolean;
}

/**
 * @hidden
 */
export type Params = TogglePauseRequirementsParams & {
  ticker: string;
};

/**
 * @hidden
 */
export async function prepareTogglePauseRequirements(
  this: Procedure<Params, Asset>,
  args: Params
): Promise<
  | TransactionSpec<Asset, ExtrinsicParams<'complianceManager', 'pauseAssetCompliance'>>
  | TransactionSpec<Asset, ExtrinsicParams<'complianceManager', 'resumeAssetCompliance'>>
> {
  const {
    context: {
      polymeshApi: { query, tx },
    },
    context,
  } = this;
  const { ticker, pause } = args;

  const rawTicker = stringToTicker(ticker, context);

  const { paused } = await query.complianceManager.assetCompliances(rawTicker);

  if (pause === boolToBoolean(paused)) {
    throw new PolymeshError({
      code: ErrorCode.NoDataChange,
      message: `Requirements are already ${paused ? '' : 'un'}paused`,
    });
  }

  return {
    transaction: pause
      ? tx.complianceManager.pauseAssetCompliance
      : tx.complianceManager.resumeAssetCompliance,
    args: [rawTicker],
    resolver: new Asset({ ticker }, context),
  };
}

/**
 * @hidden
 */
export function getAuthorization(
  this: Procedure<Params, Asset>,
  { ticker, pause }: Params
): ProcedureAuthorization {
  return {
    permissions: {
      transactions: [
        pause
          ? TxTags.complianceManager.PauseAssetCompliance
          : TxTags.complianceManager.ResumeAssetCompliance,
      ],
      assets: [new Asset({ ticker }, this.context)],
      portfolios: [],
    },
  };
}

/**
 * @hidden
 */
export const togglePauseRequirements = (): Procedure<Params, Asset> =>
  new Procedure(prepareTogglePauseRequirements, getAuthorization);
