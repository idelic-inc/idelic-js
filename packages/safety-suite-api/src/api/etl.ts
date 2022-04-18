import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {ApiOptions} from '../types';

export type WorkleteScoresQuery = {
  customerAlias: string;
  groupId?: number;
};

export type WorkleteScores = {
  current_score: number;
  worklete_score: number;
};

export type WorkleteError = {
  error: {
    code: string;
    message: string;
  };
};

export function getWorkleteScores(
  query: WorkleteScoresQuery,
  apiOptions: ApiOptions = {}
): Request<WorkleteScores> {
  return runApi({
    method: 'GET',
    urlRoot: 'etlUriBackendRoot',
    route: `/api/worklete/group-scores`,
    apiOptions,
    requestOptions: {
      query
    }
  });
}
