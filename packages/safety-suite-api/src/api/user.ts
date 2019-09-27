import {runCancellableApi} from '../runApi';

export type User = any;

export function getUser() {
  return runCancellableApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/user',
    options: {body: {}}
  });
}

export function saveUser(user: User) {
  return {
    method: 'PUT',
    url: '/api/userAccount',
    options: {body: user}
  };
}

export function getCompanies() {
  return runCancellableApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/customers',
    options: {body: {}}
  });
}
