import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse, runApi} from 'src';

import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

interface InjuryCounts {
  daysSince: number;
}

interface Injury extends BaseFields {
  recordNumber: number;
  date: string;
  terminalLabel: string;
  oshaReportable: boolean;
  daysSince: number;
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
): Request<ApiSuccessResponse<Injury[]>> {
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
