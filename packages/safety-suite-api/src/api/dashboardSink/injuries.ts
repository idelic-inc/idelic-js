import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface InjuryCounts {
  daysSince: number;
}

export interface Injury extends BaseFields {
  recordNumber: number;
  date: string;
  terminalLabel: string;
  oshaReportable: boolean;
  daysSince: number;
}

export interface InjuryResponse {
  injuries: Injury[];
}

export function getInjuryCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<InjuryCounts>> {
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

export function getInjuries(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<InjuryResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/injuries',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: convertSortsToStrings(query.sort)
      }
    }
  });
}
