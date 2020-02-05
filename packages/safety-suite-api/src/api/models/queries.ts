import {Request} from 'idelic-safety-net';
import {Record} from 'immutable';

import {ApiOptions} from '../../types';
import {runApi} from '../../runApi';

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
