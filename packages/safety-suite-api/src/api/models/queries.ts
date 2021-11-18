import {Request} from '@idelic/safety-net';
import {Record} from 'immutable';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';
import {
  Aggregation,
  ModelQuery,
  ModelQueryParams,
  OshaInput,
  QueryExport,
  QueryExportJob,
  QueryExportTypes
} from './types';

/**
 * Runs a query against the models table and returns an aggregation.
 *
 * @param modelQuery - Model query object.
 * @param apiOptions - Optional options for runApi.
 */
export function queryModels<GroupValue = unknown>(
  modelQuery: ModelQuery,
  modelQueryParams?: ModelQueryParams,
  apiOptions?: ApiOptions
): Request<Aggregation<GroupValue>[]> {
  return runApi({
    method: 'POST',
    route: '/api/models/query',
    apiOptions,
    requestOptions: {body: modelQuery, query: modelQueryParams}
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

/**
 * Starts asynchronous query export.
 *
 * @param queryExport - Models query and columns for export with timezone adjusting.
 * @param exportType - Type of resulted export file.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runQueryExport(
  queryExport: QueryExport,
  exportType: QueryExportTypes,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: `/api/models/query/export/${exportType}`,
    apiOptions,
    requestOptions: {
      body: queryExport
    }
  });
}

/**
 * Gets all non expired query export jobs.
 *
 * @param apiOptions - Optional options for runApi.
 * @returns - Array of query export jobs.
 */
export function getAllQueryExportStatuses(
  apiOptions?: ApiOptions
): Request<QueryExportJob[]> {
  return runApi({
    method: 'GET',
    route: `/api/models/query/export/status`,
    apiOptions
  });
}

/**
 * Gets query export job by it's Id.
 *
 * @param queryExportJobId - Id of desired query export job.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function getQueryExportStatus(
  queryExportJobId: number,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'GET',
    route: `/api/models/query/export/status/${queryExportJobId}`,
    apiOptions
  });
}

/**
 * Get export raw file by export query job Id.
 *
 * @param queryExportJobId - Id of desired query export job.
 * @param apiOptions - Optional options for runApi.
 * @returns - Export raw file contents.
 */
export function getQueryExportContent(
  queryExportJobId: number,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'GET',
    route: `/api/models/query/export/content/${queryExportJobId}`,
    apiOptions,
    requestOptions: {
      responseType: 'blob'
    }
  });
}

/**
 * Starts asynchronous OSHA report export.
 *
 * @param query - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runOshaReportExport(
  query: OshaInput,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/osha/xlsx',
    apiOptions,
    requestOptions: {
      body: query
    }
  });
}

/**
 * Starts asynchronous employee review report export.
 *
 * @param query - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runEmployeeReviewReportExport(
  query: EmployeeReviewParams,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/employeereview/pdf',
    apiOptions,
    requestOptions: {
      body: query
    }
  });
}

/**
 * Starts asynchronous enforcements report export.
 *
 * @param query - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runEnforcementsReportExport(
  query: ModelQuery,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/enforcements/xlsx',
    apiOptions,
    requestOptions: {
      body: query
    }
  });
}

export interface TurnoverReportFilters {
  /**
   * Report start timestamp.
   */
  dateFrom: number;
  /**
   * Report till timestamp.
   */
  dateTo: number;
  /**
   * `terminal` group id.
   */
  terminalId: number;
  /**
   * Targeted report timezone
   */
  timezone?: string;
}

/**
 * Starts asynchronous turnover report export.
 *
 * @param query - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runTurnoverReportExport(
  query: TurnoverReportFilters,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/turnover/xlsx',
    apiOptions,
    requestOptions: {
      body: query
    }
  });
}

/**
 * Starts asynchronous incomplete training report export.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runIncompleteTrainingReportExport(
  filters: CommonTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/notCompletedTrainings/xlsx',
    apiOptions,
    requestOptions: {
      body: filters
    }
  });
}

/**
 * Starts asynchronous expiring training report export.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runExpiringTrainingReportExport(
  filters: ExpiringTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/expiringTrainings/xlsx',
    apiOptions,
    requestOptions: {
      body: filters
    }
  });
}

/**
 * Starts asynchronous due training report export.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runDueTrainingReportExport(
  filters: DueTrainingReportFilters,
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/dueTrainings/xlsx',
    apiOptions,
    requestOptions: {
      body: filters
    }
  });
}

export interface ClearinghouseReportFilters {
  /**
   * Array of employee position enum value
   */
  positions?: string[];
  /**
   * Array of employee status enum value
   */
  statuses?: string[];
}

/**
 * Starts asynchronous clearinghouse report export.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Query export job object.
 */
export function runClearinghouseReportExport(
  filters: ClearinghouseReportFilters = {},
  apiOptions?: ApiOptions
): Request<QueryExportJob> {
  return runApi({
    method: 'POST',
    route: '/api/models/query/export/clearingHouse/xlsx',
    apiOptions,
    requestOptions: {
      body: filters
    }
  });
}
