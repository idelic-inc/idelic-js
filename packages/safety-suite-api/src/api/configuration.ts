import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {ApiOptions, EmptyRequest, EmptyResponse} from '../types';

/**
 * Make SAF backend reload actual configuration form config service.
 *
 * @param apiOptions - Optional options for runApi.
 * @returns - Empty response.
 */
export function reloadSAFBackendConfiguration(
  apiOptions?: ApiOptions
): Request<EmptyResponse> {
  return runApi<EmptyRequest, EmptyResponse>({
    method: 'POST',
    route: '/api/configuration',
    apiOptions
  });
}
