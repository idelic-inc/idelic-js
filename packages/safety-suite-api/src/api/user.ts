import {runCancellableApi} from "../runApi";

export type User = any;

export function getUser() {
  return runCancellableApi({
    method: 'GET',
    url: '/api/userAccount',
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
    url: '/api/1.0/customers',
    options: {body: {}}
  }, undefined, 'loginUrlRoot');
}