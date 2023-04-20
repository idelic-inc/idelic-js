import {DateTime} from 'luxon';

import {ModelQuery, ModelQueryParams} from '../api/models/types';
import {Id} from '../types';
import {LegacyApi} from './types';

export function getMonitorsParams(): LegacyApi {
  return {
    method: 'GET',
    route: '/api/monitor'
  };
}

export function getMonitorModelsIdsParams(
  monitorId: Id,
  body: ModelQuery,
  modelQueryParams?: ModelQueryParams
): LegacyApi {
  return {
    method: 'POST',
    route: `/api/monitor/${monitorId}/run`,
    requestOptions: {
      body,
      query: modelQueryParams
    }
  };
}

export function getMonitorsActionParams(
  monitorId: Id,
  query: ModelQuery,
  type: string
): LegacyApi {
  return {
    method: 'POST',
    route: `/api/monitor/${monitorId}/action`,
    requestOptions: {
      body: {query, type, options: {timezone: DateTime.now().zoneName}},
      responseType: type === 'export' ? 'text' : 'json'
    }
  };
}
