import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface DevelopmentPlanCounts {
  activePlans: number;
  tasksAssigned: number;
  tasksPastDue: number;
}

export interface DevelopmentPlan extends BaseFields {
  recordNumber: number;
  planType: string;
  planStatus: string;
}

export interface DevelopmentPlanResponse {
  developmentPlans: DevelopmentPlan[];
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
): Request<ApiSuccessResponse<DevelopmentPlanResponse>> {
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
