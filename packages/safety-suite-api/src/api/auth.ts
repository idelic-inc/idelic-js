import {Request} from 'idelic-safety-net';
import {runApi} from '../runApi';

export type AuthToken = string;
export type ChangePassword = any;
export type PasswordReset = any;
export type PasswordResetRequest = any;
export type UnlockAccountRequest = any;

export const getPasswordPolicy = {
  method: 'GET',
  route: '/api/customer/passwordPolicy',
  noToken: true
};

export function register(
  email: string,
  password: string,
  confirmPassword: string
): Request<{}> {
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/register',
    options: {
      body: {
        email,
        password,
        confirmPassword
      }
    }
  });
}

export function login(email: string, password: string): Request<{}> {
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/login',
    options: {
      body: {
        email,
        password
      }
    }
  });
}

export function logout(): Request<{}> {
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/logout',
    options: {body: {}}
  });
}

export function activateAccount(token: AuthToken) {
  return {
    method: 'POST',
    route: '/api/account/activate',
    options: {
      body: {},
      query: [['token', token]]
    }
  };
}

export function requestPasswordReset(body: PasswordResetRequest) {
  return {
    method: 'POST',
    route: '/api/password/forgot',
    options: {body}
  };
}

export function requestUnlockAccount(body: UnlockAccountRequest) {
  return {
    method: 'POST',
    route: '/api/account/unlock/send',
    options: {body}
  };
}

export function resetPassword(body: PasswordReset) {
  return {
    method: 'POST',
    route: '/api/password/reset',
    options: {body}
  };
}

export function changePassword(body: ChangePassword) {
  return {
    method: 'POST',
    route: '/api/password/change',
    options: {body}
  };
}

export function unlockAccount(token: AuthToken) {
  return {
    method: 'POST',
    route: '/api/account/unlock',
    options: {
      body: {},
      query: [['token', token]]
    }
  };
}
