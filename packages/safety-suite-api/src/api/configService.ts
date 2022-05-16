import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse} from 'src/types';

import {runApi} from '../runApi';

export function getConfigTypes(
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<string[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'configServiceUrlRoot',
    route: '/api/configuration',
    apiOptions
  });
}
