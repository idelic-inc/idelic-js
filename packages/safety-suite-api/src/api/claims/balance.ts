import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';

export interface Balance {
  category: string;
  reserve: number;
  payment: number;
  reimbursement: number;
  incurredExpense: number;
  reservesRemaining: number;
  incurredLoss: number;
}

/**
 * Get Balance For Claim By ClaimId.
 *
 * @param claimId - Claim Id.
 * @param customerAlias - Customer alias.
 * @param apiOptions - Optional options for runApi.
 * @returns - Balance Array Grouped By Category.
 */
export function getBalanceByClaimId(
  claimId: string,
  customerAlias: string,
  apiOptions?: ApiOptions
): Request<Balance[]> {
  return runApi({
    method: 'GET',
    urlRoot: 'claimsSinkUrlRoot',
    route: `/api/balance/${claimId}`,
    apiOptions,
    requestOptions: {
      query: {
        customerAlias
      }
    }
  });
}
