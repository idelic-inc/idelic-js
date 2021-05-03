import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface AccidentCounts {
  daysSincePreventable: number;
}

export interface Accident extends BaseFields {
  recordNumber: number;
  date: string;
  terminalLabel: string;
  type: string;
  preventable: boolean;
  daysSince: number;
}

export interface AccidentResponse {
  accidents: Accident[];
}

export function getAccidentCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<AccidentCounts>> {
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

export function getAccidents(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<AccidentResponse>> {
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
