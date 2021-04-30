import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {BaseFields, Query, TableQuery} from './types';
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

export type RiskScoreGraph = Record<RiskScoreBuckets, number>;

export interface RiskScore extends BaseFields {
  terminalLabel: string;
  riskScore: number;
  planStatus: string;
}

export interface RiskScoreResponse {
  riskScores: RiskScore[];
}

export function getRiskScoresGraph(
  query: Query,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<RiskScoreGraph>> {
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

export function getRiskScores(
  query: TableQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<RiskScoreResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/fleet-performance/risk-scores',
    apiOptions,
    requestOptions: {
      query: {
        ...query,
        sort: convertSortsToStrings(query.sort)
      }
    }
  });
}
