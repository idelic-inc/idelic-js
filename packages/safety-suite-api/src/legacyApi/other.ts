import momentTimezone from 'moment-timezone';

import {Id} from '../types';
import {LegacyApi} from './types';

export const getApi: LegacyApi = {
  method: 'GET',
  route: '/api'
};

export function getCorrectiveActionLetterParams(
  correctiveActionId: Id
): LegacyApi {
  return {
    method: 'GET',
    route: `/api/letters/correctiveActions/${correctiveActionId}?timezone=${momentTimezone.tz.guess()}`,
    requestOptions: {responseType: 'text'}
  };
}

export const getCurrentCustomer: LegacyApi = {
  method: 'GET',
  route: '/api/customer/configuration'
};
