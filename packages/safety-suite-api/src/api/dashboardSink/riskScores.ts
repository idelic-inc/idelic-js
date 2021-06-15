import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {DashboardBaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

export type RiskScoreBuckets =
  | '1'
  | '11'
  | '21'
  | '31'
  | '41'
  | '51'
  | '61'
  | '71'
  | '81'
  | '91';

export type DashboardRiskScoreGraph = Record<RiskScoreBuckets, number>;

export interface DashboardRiskScore extends DashboardBaseFields {
  terminalLabel: string;
  riskScore: number;
  planStatus: string;
}

export interface DashboardRiskScoreResponse {
  riskScores: DashboardRiskScore[];
}

export function getDashboardRiskScoresGraph(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardRiskScoreGraph>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/risk-scores/graph',
    apiOptions,
    requestOptions: {
      query
    }
  });
}

export function getDashboardRiskScores(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<DashboardRiskScoreResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/risk-scores',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: query.sort && convertSortsToStrings(query.sort)
      }
    }
  });
}
