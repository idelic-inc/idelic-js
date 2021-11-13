import {Request} from '@idelic/safety-net';
import {runApi} from 'src/runApi';
import {ApiOptions, ApiResponse} from 'src/types';

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
