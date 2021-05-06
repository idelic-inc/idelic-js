import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {DashboardBaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface DashboardEnforcementCounts {
  inspections: number;
  cleanInspections: number;
  inspectionsWithViolations: number;
}

export interface DashboardEnforcement extends DashboardBaseFields {
  recordNumber: number;
  date: string;
  csaPoints: number;
  outOfService: boolean;
}

export interface DashboardEnforcementResponse {
  enforcements: DashboardEnforcement[];
}

export function getDashboardEnforcementCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardEnforcementCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/enforcements/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getDashboardEnforcements(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardEnforcementResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/enforcements',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: convertSortsToStrings(query.sort)
      }
    }
  });
}
