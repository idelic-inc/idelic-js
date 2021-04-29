import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse, runApi} from 'src';

import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

interface ExpirationCounts {
  expired: number;
  expiresIn30Days: number;
  expiresIn60Days: number;
}

interface Expiration extends BaseFields {
  recordNumber: number;
  expirationDate: string;
  terminalLabel: string;
  recordType: string;
}

export function getExpirationCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<ExpirationCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expirations/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getExpirations(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<Expiration[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expirations',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: convertSortsToStrings(query.sort)
      }
    }
  });
}
