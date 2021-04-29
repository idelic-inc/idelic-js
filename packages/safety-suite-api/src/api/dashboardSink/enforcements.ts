import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse, runApi} from 'src';

import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface EnforcementCounts {
  inspections: number;
  cleanInspections: number;
  inspectionsWithViolations: number;
}

export interface Enforcement extends BaseFields {
  recordNumber: number;
  date: string;
  csaPoints: number;
  outOfService: boolean;
}

export function getEnforcementCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<EnforcementCounts>> {
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

export function getEnforcements(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<Enforcement[]>> {
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
