import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse, runApi} from 'src';

import {BaseFields, Query, TableQuery} from './types';
import {convertSortsToStrings} from './util';

type RiskScoreBuckets =
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

type RiskScoreGraph = {[R in RiskScoreBuckets]: number};

interface RiskScore extends BaseFields {
  terminalLabel: string;
  riskScore: number;
  planStatus: string;
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
): Request<ApiSuccessResponse<RiskScore[]>> {
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
