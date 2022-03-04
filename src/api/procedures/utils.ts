import {
  Checkpoint,
  CheckpointSchedule,
  Context,
  CustomPermissionGroup,
  Instruction,
  KnownPermissionGroup,
  NumberedPortfolio,
  PolymeshError,
} from '~/internal';
import {
  ErrorCode,
  InputTargets,
  InputTaxWithholding,
  InstructionStatus,
  InstructionType,
  PermissionGroupType,
  SecondaryKey,
  SignerValue,
} from '~/types';
import { PortfolioId } from '~/types/internal';
import { signerToSignerValue, u64ToBigNumber } from '~/utils/conversion';

/**
 * @hidden
 */
export async function assertInstructionValid(
  instruction: Instruction,
  context: Context
): Promise<void> {
  const details = await instruction.details();
  const { status } = await instruction.details();

  if (status !== InstructionStatus.Pending) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: 'The Instruction must be in pending state',
    });
  }

  if (details.type === InstructionType.SettleOnBlock) {
    const latestBlock = await context.getLatestBlock();
    const { endBlock } = details;

    if (latestBlock >= endBlock) {
      throw new PolymeshError({
        code: ErrorCode.ValidationError,
        message: 'The instruction cannot be modified; it has already reached its end block',
        data: {
          currentBlock: latestBlock,
          endBlock,
        },
      });
    }
  }
}

/**
 * @hidden
 */
export async function assertPortfolioExists(
  portfolioId: PortfolioId,
  context: Context
): Promise<void> {
  const { did, number } = portfolioId;

  if (number) {
    const numberedPortfolio = new NumberedPortfolio({ did, id: number }, context);
    const exists = await numberedPortfolio.exists();

    if (!exists) {
      throw new PolymeshError({
        code: ErrorCode.ValidationError,
        message: "The Portfolio doesn't exist",
        data: {
          did,
          portfolioId: number,
        },
      });
    }
  }
}

/**
 * @hidden
 */
export function assertSecondaryKeys(
  signerValues: SignerValue[],
  secondaryKeys: SecondaryKey[]
): void {
  const notInTheList: string[] = [];
  signerValues.forEach(({ value: itemValue }) => {
    const isPresent = secondaryKeys
      .map(({ signer }) => signerToSignerValue(signer))
      .find(({ value }) => value === itemValue);
    if (!isPresent) {
      notInTheList.push(itemValue);
    }
  });

  if (notInTheList.length) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: 'One of the Signers is not a Secondary Key for the Identity',
      data: {
        missing: notInTheList,
      },
    });
  }
}

/**
 * @hidden
 */
export function assertDistributionOpen(paymentDate: Date, expiryDate: Date | null): void {
  const now = new Date();

  if (paymentDate > now) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: "The Distribution's payment date hasn't been reached",
      data: { paymentDate },
    });
  }

  if (expiryDate && expiryDate < now) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: 'The Distribution has already expired',
      data: {
        expiryDate,
      },
    });
  }
}

/**
 * @hidden
 */
export function assertCaTargetsValid(targets: InputTargets, context: Context): void {
  const { maxTargetIds } = context.polymeshApi.consts.corporateAction;

  const maxTargets = u64ToBigNumber(maxTargetIds);

  if (maxTargets.lt(targets.identities.length)) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: 'Too many target Identities',
      data: {
        maxTargets,
      },
    });
  }
}

/**
 * @hidden
 */
export function assertCaTaxWithholdingsValid(
  taxWithholdings: InputTaxWithholding[],
  context: Context
): void {
  const { maxDidWhts } = context.polymeshApi.consts.corporateAction;

  const maxWithholdingEntries = u64ToBigNumber(maxDidWhts);

  if (maxWithholdingEntries.lt(taxWithholdings.length)) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: 'Too many tax withholding emties',
      data: {
        maxWithholdingEntries,
      },
    });
  }
}

/**
 * @hidden
 */
export async function assertCaCheckpointValid(
  checkpoint: Checkpoint | CheckpointSchedule | Date
): Promise<void> {
  if (checkpoint instanceof Date) {
    if (checkpoint <= new Date()) {
      throw new PolymeshError({
        code: ErrorCode.ValidationError,
        message: 'Checkpoint date must be in the future',
      });
    }
  } else {
    const exists = await checkpoint.exists();

    if (!exists) {
      throw new PolymeshError({
        code: ErrorCode.ValidationError,
        message:
          checkpoint instanceof Checkpoint
            ? "Checkpoint doesn't exist"
            : "Checkpoint Schedule doesn't exist",
      });
    }
  }
}

/**
 * @hidden
 */
export async function assertDistributionDatesValid(
  checkpoint: CheckpointSchedule | Date,
  paymentDate: Date,
  expiryDate: Date | null
): Promise<void> {
  let checkpointDate: Date;

  if (checkpoint instanceof Date) {
    checkpointDate = checkpoint;
  } else {
    ({ nextCheckpointDate: checkpointDate } = await checkpoint.details());
  }

  if (paymentDate <= checkpointDate) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: 'Payment date must be after the Checkpoint date',
    });
  }

  if (expiryDate && expiryDate < checkpointDate) {
    throw new PolymeshError({
      code: ErrorCode.ValidationError,
      message: 'Expiry date must be after the Checkpoint date',
    });
  }
}

/**
 * @hidden
 */
export function isFullGroupType(group: KnownPermissionGroup | CustomPermissionGroup): boolean {
  return group instanceof KnownPermissionGroup && group.type === PermissionGroupType.Full;
}
