import {Request} from '@idelic/safety-net';
import {Record} from 'immutable';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';
import {Aggregation, ModelQuery} from './types';

/**
 * Runs a query against the models table and returns an aggregation.
 *
 * @param modelQuery - Model query object.
 * @param apiOptions - Optional options for runApi.
 */
export function queryModels<GroupValue = unknown>(
  modelQuery: ModelQuery,
  apiOptions?: ApiOptions
): Request<Aggregation<GroupValue>> {
  return runApi({
    method: 'POST',
    route: '/api/models/query',
    apiOptions,
    requestOptions: {body: modelQuery}
  });
}

export type EmployeeReviewTypes = 'EMPLOYEE' | 'TERMINAL';

export type EmployeeReviewParams = {
  dateFrom: number;
  dateTo: number;
  subject: EmployeeReviewTypes;
  id: number;
  timezone: string;
};

export const EmployeeReviewParamsRecord = Record<EmployeeReviewParams>({
  dateFrom: -1,
  dateTo: -1,
  subject: 'TERMINAL',
  id: -1,
  timezone: 'America/Los_Angeles'
});

export function exportEmployeeReviewReport(
  params: EmployeeReviewParams,
  apiOptions?: ApiOptions
): Request<Blob>;
export function exportEmployeeReviewReport(
  params: Record<EmployeeReviewParams>,
  apiOptions?: ApiOptions
): Request<Blob>;
export function exportEmployeeReviewReport(
  params: EmployeeReviewParams | Record<EmployeeReviewParams>,
  apiOptions: ApiOptions = {}
): Request<Blob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/employeereview/pdf',
    apiOptions,
    requestOptions: {
      body: params,
      responseType: 'blob'
    }
  });
}

export type ExpiringTrainingReportQuery = Omit<
  ModelQuery,
  'aggregation' | 'modelsIds'
>;

/**
 * Returns an aggregation of TrainingAttendanceModel ids.
 *
 * @param query - Similar to `runModelsQuery` argument, but without `aggregation` or `modelsIds` options.
 * @param apiOptions - Optional options for runApi.
 */
export function runExpiringTrainingReport(
  query: ExpiringTrainingReportQuery,
  apiOptions?: ApiOptions
): Request<[Aggregation]> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/expiringTrainings',
    apiOptions,
    requestOptions: {
      body: query
    }
  });
}

/**
 * Returns a Blob of an XLSX file.
 *
 * @param query - Similar to `runModelsQuery` argument, but without `aggregation` or `modelsIds` options.
 * @param apiOptions - Optional options for runApi.
 */
export function exportExpiringTrainingReport(
  query: ExpiringTrainingReportQuery,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/expiringTrainings/xlsx',
    apiOptions,
    requestOptions: {
      body: query,
      responseType: 'blob'
    }
  });
}
