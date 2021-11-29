import {Request} from '@idelic/safety-net';
import {QueryExportJob} from 'src/api/models/types';
import {ApiOptions, ApiResponse} from 'src/types';

import {runApi} from '../../runApi';

export type AuditLogQuery = {
  customerAlias: string;
  dateFrom?: number;
  dateTo?: number;
  actions?: string[];
  objectTypes?: string[];
  orderBy?: string;
  direction?: 'asc' | 'desc';
  lastLogId?: string;
  limit?: number;
};

export type AuditLogItem = {
  id: string;
  date: string;
  userName: string;
  userEmail: string;
  userRoleType: string;
  action: string;
  objectType: string;
  linkUrl: string;
  linkText: string;
  details: string;
};

export type AuditLogExportJob = QueryExportJob & {id: string};

/**
 * Gets audit log items based on query parameters
 * @param apiOptions Optional options for runApi.
 * @returns Array of `AuditLogItem` objects.
 */
export const getAuditLog = (
  query: AuditLogQuery,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<AuditLogItem[]>> =>
  runApi({
    method: 'GET',
    urlRoot: 'auditLogUrlRoot',
    route: '/api/auditlogs',
    apiOptions,
    requestOptions: {query}
  });

/**
 * Starts asynchronous audit log export.
 *
 * @param filters - Object containing various filters for the report.
 * @param apiOptions - Optional options for runApi.
 * @returns - Audit log export job object.
 */
export function runAuditLogExportJob(
  query: AuditLogQuery,
  apiOptions?: ApiOptions
): Request<AuditLogExportJob> {
  return runApi({
    method: 'POST',
    urlRoot: 'auditLogUrlRoot',
    route: '/api/auditlogs/xlsx',
    apiOptions,
    requestOptions: {
      body: query
    }
  });
}

/**
 * Gets all audit export jobs.
 *
 * @param apiOptions - Optional options for runApi.
 * @returns - Audit log export job object.
 */
export function getAuditLogExportStatus(
  apiOptions?: ApiOptions
): Request<AuditLogExportJob> {
  return runApi({
    method: 'GET',
    urlRoot: 'auditLogUrlRoot',
    route: `/api/auditLogs/status`,
    apiOptions
  });
}

/**
 * Gets audit log export job by it's uuid.
 *
 * @param queryExportJobId - uuid of desired audit log export job.
 * @param apiOptions - Optional options for runApi.
 * @returns - Audit log export job object.
 */
export function getAuditLogExportStatusById(
  uuid: string,
  apiOptions?: ApiOptions
): Request<AuditLogExportJob> {
  return runApi({
    method: 'GET',
    urlRoot: 'auditLogUrlRoot',
    route: `/api/auditLogs/status/${uuid}`,
    apiOptions
  });
}

/**
 * Get audit log export raw file by uuid.
 *
 * @param queryExportJobId - uuid of desired audit log export job.
 * @param apiOptions - Optional options for runApi.
 * @returns - Export raw file contents.
 */
export function getAuditLogExportContent(
  uuid: string,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'GET',
    urlRoot: 'auditLogUrlRoot',
    route: `/api/auditLogs/content/${uuid}`,
    apiOptions,
    requestOptions: {
      responseType: 'blob'
    }
  });
}
