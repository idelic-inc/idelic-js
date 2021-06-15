import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {DashboardBaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface DashboardExpirationCounts {
  expired: number;
  expiresIn30Days: number;
  expiresIn60Days: number;
}

export interface DashboardExpiringDocument extends DashboardBaseFields {
  expirationDate: string;
  terminalLabel: string;
  recordType: string;
}

export interface DashboardExpirationResponse {
  expiringDocuments: DashboardExpiringDocument[];
}

export function getDashboardExpirationCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardExpirationCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expiring-documents/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getDashboardExpirations(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardExpirationResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/expiring-documents',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: query.sort && convertSortsToStrings(query.sort)
      }
    }
  });
}
