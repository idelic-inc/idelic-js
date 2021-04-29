import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse, runApi} from 'src';

import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

interface AccidentCounts {
  daysSincePreventable: number;
}

interface Accident extends BaseFields {
  recordNumber: number;
  date: string;
  terminalLabel: string;
  type: string;
  preventable: boolean;
  daysSince: number;
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
): Request<ApiSuccessResponse<Accident[]>> {
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
