import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {ApiOptions, ApiResponse} from '../types';

export interface Integration {
  integrationAlias: string;
  lastUpdatedDate: string | null;
}

export function getIntegrations(
  customerAlias: string,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<Integration[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/integrations/${customerAlias}`,
    apiOptions
  });
}
