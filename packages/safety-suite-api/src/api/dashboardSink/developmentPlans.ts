import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {DashboardBaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export interface DashboardDevelopmentPlanCounts {
  activePlans: number;
  tasksAssigned: number;
  tasksPastDue: number;
}

export interface DashboardDevelopmentPlan extends DashboardBaseFields {
  planType: string;
  planStatus: string;
}

export interface DashboardDevelopmentPlanResponse {
  developmentPlans: DashboardDevelopmentPlan[];
}

export function getDashboardDevelopmentPlanCounts(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardDevelopmentPlanCounts>> {
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

export function getDashboardDevelopmentPlans(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardDevelopmentPlanResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/development-plans',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: query.sort && convertSortsToStrings(query.sort)
      }
    }
  });
}
