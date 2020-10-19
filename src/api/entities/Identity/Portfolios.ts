import { Identity, Namespace, NumberedPortfolio } from '~/api/entities';
import { createPortfolio } from '~/api/procedures';
import { TransactionQueue } from '~/base';

/**
 * Handles all Portfolio related functionality on the Identity side
 */
export class Portfolios extends Namespace<Identity> {
  /**
   * Create a new portfolio to the current Identity
   */
  public createPortfolio(args: { name: string }): Promise<TransactionQueue<NumberedPortfolio>> {
    const { name } = args;
    const { context } = this;
    return createPortfolio.prepare({ name }, context);
  }
}
