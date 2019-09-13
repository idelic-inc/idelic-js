import {User} from './user';

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

export function register(user: User) {
  return {
    method: 'POST',
    url: '/api/signup',
    options: {body: user}
  };
}

export function login(user: User) {
  return {
    method: 'POST',
    url: '/api/signin',
    options: {body: user}
  };
}

export const logout = {
  method: 'POST',
  url: '/api/signout',
  options: {body: {}}
};

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
