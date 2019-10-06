import {LegacyApi} from './types';

export type UserAccount = any;

export function save(user: UserAccount): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/userAccount',
    requestOptions: {body: user}
  };
}
