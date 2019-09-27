import {runCancellableApi} from '../runApi';
import {Request} from 'idelic-safety-net';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

export type Status = 'DEV' | 'TESTING' | 'ONBOARDING' | 'LIVE' | 'DISABLED';

export interface Company {
  id: number;
  name: string;
  alias: string;
  status: Status;
  logoUrl?: string;
}

export function getUser(): Request<User> {
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

export function getCompanies(): Request<Company[]> {
  return runCancellableApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/customers',
    options: {body: {}}
  });
}
