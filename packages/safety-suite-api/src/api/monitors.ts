import momentTimezone from 'moment-timezone';

import {Id} from 'src/baseTypes';

import {ModelQuery} from './models';

export function getMonitorsParams() {
  return {
    method: 'GET',
    url: '/api/monitor'
  };
}

export function getMonitorModelsIdsParams(monitorId: Id, body: ModelQuery) {
  return {
    method: 'POST',
    url: `/api/monitor/${monitorId}/run`,
    options: {
      body
    }
  };
}

export function getMonitorsActionParams(
  monitorId: Id,
  query: ModelQuery,
  type: string
) {
  return {
    method: 'POST',
    url: `/api/monitor/${monitorId}/action`,
    options: {
      body: {query, type, options: {timezone: momentTimezone.tz.guess()}},
      responseType: type === 'export' ? 'text' : 'json'
    }
  };
}
