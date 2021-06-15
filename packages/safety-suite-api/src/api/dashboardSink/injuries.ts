import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {DashboardBaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface DashboardInjuryCounts {
  daysSince: number;
}

export interface DashboardInjury extends DashboardBaseFields {
  date: string;
  terminalLabel: string;
  oshaReportable: boolean;
  daysSince: number;
}

export interface DashboardInjuryResponse {
  injuries: DashboardInjury[];
}

export function getDashboardInjuryCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardInjuryCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/injuries/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getDashboardInjuries(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardInjuryResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/injuries',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: query.sort && convertSortsToStrings(query.sort)
      }
    }
  });
}
