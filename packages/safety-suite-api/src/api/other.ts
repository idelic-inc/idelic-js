import momentTimezone from 'moment-timezone';

import {Id} from 'src/baseTypes';

export function getCorrectiveActionLetterParams(correctiveActionId: Id) {
  return {
    method: 'GET',
    url: `/api/letters/correctiveActions/${correctiveActionId}?timezone=${momentTimezone.tz.guess()}`,
    options: {responseType: 'text'}
  };
}
