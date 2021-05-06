import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {DashboardBaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface DashboardAccidentCounts {
  daysSincePreventable: number;
}

export interface DashboardAccident extends DashboardBaseFields {
  recordNumber: number;
  date: string;
  terminalLabel: string;
  type: string;
  preventable: string;
  daysSince: number;
}

export interface DashboardAccidentResponse {
  accidents: DashboardAccident[];
}

export function getDashboardAccidentCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardAccidentCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/accidents/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getDashboardAccidents(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardAccidentResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/accidents',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: convertSortsToStrings(query.sort)
      }
    }
  });
}
