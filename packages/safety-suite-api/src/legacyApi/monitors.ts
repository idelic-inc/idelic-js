import momentTimezone from 'moment-timezone';

import {ModelQuery} from '../api/models/types';
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
  body: ModelQuery
): LegacyApi {
  return {
    method: 'POST',
    route: `/api/monitor/${monitorId}/run`,
    requestOptions: {
      body
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
      body: {query, type, options: {timezone: momentTimezone.tz.guess()}},
      responseType: type === 'export' ? 'text' : 'json'
    }
  };
}
