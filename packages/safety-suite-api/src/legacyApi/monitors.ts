import momentTimezone from 'moment-timezone';

import {Id} from '../baseTypes';

import {ModelQuery} from './models';

export function getMonitorsParams() {
  return {
    method: 'GET',
    route: '/api/monitor'
  };
}

export function getMonitorModelsIdsParams(monitorId: Id, body: ModelQuery) {
  return {
    method: 'POST',
    route: `/api/monitor/${monitorId}/run`,
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
    route: `/api/monitor/${monitorId}/action`,
    options: {
      body: {query, type, options: {timezone: momentTimezone.tz.guess()}},
      responseType: type === 'export' ? 'text' : 'json'
    }
  };
}
