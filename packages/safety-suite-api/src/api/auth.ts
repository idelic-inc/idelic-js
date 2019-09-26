import {Request} from 'idelic-safety-net';
import {runCancellableApi} from '../runApi';

export type AuthToken = string;
export type ChangePassword = any;
export type PasswordReset = any;
export type PasswordResetRequest = any;
export type UnlockAccountRequest = any;

export const getPasswordPolicy = {
  method: 'GET',
  url: '/api/customer/passwordPolicy',
  noToken: true
};

export function register(
  email: string,
  password: string
): Request<string> {
  return runCancellableApi({
    method: 'POST',
    url: '/api/1.0/authentication/register',
    options: {body: {
      email,
      password
    }}
  }, undefined, 'loginUrlRoot');
}

export function login(
  email: string,
  password: string
): Request<string> {
  return runCancellableApi({
    method: 'POST',
    url: '/api/1.0/authentication/login',
    options: {body: {
      email,
      password
    }}
  }, undefined, 'loginUrlRoot');
}

export function logout(): Request<string> {
  return runCancellableApi({
    method: 'POST',
    url: '/api/1.0/authentication/logout',
    options: {body: {}}
  }, undefined, 'loginUrlRoot');
}

export function activateAccount(token: AuthToken) {
  return {
    method: 'POST',
    url: '/api/account/activate',
    options: {
      body: {},
      query: [['token', token]]
    }
  };
}

export function requestPasswordReset(body: PasswordResetRequest) {
  return {
    method: 'POST',
    url: '/api/password/forgot',
    options: {body}
  };
}

export function requestUnlockAccount(body: UnlockAccountRequest) {
  return {
    method: 'POST',
    url: '/api/account/unlock/send',
    options: {body}
  };
}

export function resetPassword(body: PasswordReset) {
  return {
    method: 'POST',
    url: '/api/password/reset',
    options: {body}
  };
}

export function changePassword(body: ChangePassword) {
  return {
    method: 'POST',
    url: '/api/password/change',
    options: {body}
  };
}

export function unlockAccount(token: AuthToken) {
  return {
    method: 'POST',
    url: '/api/account/unlock',
    options: {
      body: {},
      query: [['token', token]]
    }
  };
}
