import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {ApiOptions, ApiResponse} from '../types';

export interface Integration {
  integrationAlias: string;
  integrationLabels: string[];
  lastUpdatedDate: string | null;
}

export function getIntegrations(
  customerAlias: string,
  labels: string[] = [],
  apiOptions: ApiOptions = {}
): Request<ApiResponse<Integration[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/integrations/${customerAlias}`,
    requestOptions: {query: {labels}},
    apiOptions
  });
}

export function updateIntegrationDate(
  customerAlias: string,
  integrationAlias: string,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<Integration[]>> {
  return runApi({
    method: 'PUT',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/integrations/${customerAlias}/${integrationAlias}/touch`,
    apiOptions
  });
}
