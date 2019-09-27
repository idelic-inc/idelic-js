import momentTimezone from 'moment-timezone';

import {Id} from '../baseTypes';

export function getCorrectiveActionLetterParams(correctiveActionId: Id) {
  return {
    method: 'GET',
    route: `/api/letters/correctiveActions/${correctiveActionId}?timezone=${momentTimezone.tz.guess()}`,
    options: {responseType: 'text'}
  };
}
