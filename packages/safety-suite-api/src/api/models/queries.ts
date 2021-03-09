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
): Request<Aggregation<GroupValue>[]> {
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

export interface CommonTrainingReportFilters {
  /**
   * List of `employee` model ids.
   */
  employeeIds?: number[];
  /**
   * List of `employee_positions` enum value aliases.
   */
  employeePositions?: string[];
  /**
   * List of `terminal` group ids.
   */
  employeeTerminals?: number[];
  /**
   * List of `training_course` model ids.
   */
  courseIds?: number[];
}

/**
 * Returns an array of TrainingAttendanceModel ids.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 */
export function runIncompleteTrainingReport(
  filters: CommonTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<number[]> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/notCompletedTrainings',
    apiOptions,
    requestOptions: {
      body: filters
    }
  });
}
/**
 * Returns a Blob of an XLSX file.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 */
export function exportIncompleteTrainingReport(
  filters: CommonTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/notCompletedTrainings/xlsx',
    apiOptions,
    requestOptions: {
      body: filters,
      responseType: 'blob'
    }
  });
}

export interface ExpiringTrainingReportFilters
  extends CommonTrainingReportFilters {
  expirationDateFrom?: number;
  /**
   * @defaultvalue - Current date plus 120 days.
   */
  expirationDateTo?: number;
}
/**
 * Returns an array of TrainingAttendanceModel ids.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 */
export function runExpiringTrainingReport(
  filters: ExpiringTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<number[]> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/expiringTrainings',
    apiOptions,
    requestOptions: {
      body: filters
    }
  });
}
/**
 * Returns a Blob of an XLSX file.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 */
export function exportExpiringTrainingReport(
  filters: ExpiringTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/expiringTrainings/xlsx',
    apiOptions,
    requestOptions: {
      body: filters,
      responseType: 'blob'
    }
  });
}

export interface DueTrainingReportFilters extends CommonTrainingReportFilters {
  dueDateFrom?: number;
  /**
   * @defaultvalue - Current date plus 120 days.
   */
  dueDateTo?: number;
}
/**
 * Returns an array of TrainingAttendanceModel ids.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 */
export function runDueTrainingReport(
  filters: DueTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<number[]> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/dueTrainings',
    apiOptions,
    requestOptions: {
      body: filters
    }
  });
}
/**
 * Returns a Blob of an XLSX file.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 */
export function exportDueTrainingReport(
  filters: DueTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/canned/dueTrainings/xlsx',
    apiOptions,
    requestOptions: {
      body: filters,
      responseType: 'blob'
    }
  });
}
