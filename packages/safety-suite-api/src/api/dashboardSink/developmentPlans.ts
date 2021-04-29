import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse, runApi} from 'src';

import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

interface DevelopmentPlanCounts {
  activePlans: number;
  tasksAssigned: number;
  tasksPastDue: number;
}

interface DevelopmentPlan extends BaseFields {
  recordNumber: number;
  planType: string;
  planStatus: string;
}

export function getDevelopmentPlanCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DevelopmentPlanCounts>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/development-plans/counts',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getDevelopmentPlans(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DevelopmentPlan[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/development-plans',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: convertSortsToStrings(query.sort)
      }
    }
  });
}
