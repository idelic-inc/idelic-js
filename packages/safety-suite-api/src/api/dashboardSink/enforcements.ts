import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
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

export interface EnforcementResponse {
  enforcements: Enforcement[];
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
): Request<ApiSuccessResponse<EnforcementResponse>> {
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
