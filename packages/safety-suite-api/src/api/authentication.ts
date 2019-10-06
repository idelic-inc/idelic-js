import {Request, RequestOptions} from 'idelic-safety-net';
import {Record} from 'immutable';

import {EmptyResponse} from '../baseTypes';
import {runApi} from '../runApi';
import {createTransformers} from '../utils';

export interface InputUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
}

export interface RegisterUser {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPassword {
  email: string;
  token: string;
  password: string;
  passwordConfirm: string;
}

export const InputUserRecord = Record<InputUser>({
  email: '',
  firstName: '',
  lastName: ''
});
export const UserRecord = Record<User>({
  id: -1,
  email: '',
  firstName: '',
  lastName: '',
  admin: false
});
export const RegisterUserRecord = Record<RegisterUser>({
  email: '',
  password: '',
  passwordConfirm: ''
});
export const LoginUserRecord = Record<LoginUser>({email: '', password: ''});
export const ResetPasswordRequestRecord = Record<ResetPasswordRequest>({
  email: ''
});
export const ResetPasswordRecord = Record<ResetPassword>({
  email: '',
  token: '',
  password: '',
  passwordConfirm: ''
});

export function createUser(
  user: InputUser,
  options: RequestOptions<User>
): Request<User>;
export function createUser(
  user: Record<InputUser>,
  options: RequestOptions<Record<User>>
): Request<Record<User>>;
export function createUser(
  user: any,
  options: RequestOptions<any> = {}
): Request<any> {
  const transformers = createTransformers<User>(UserRecord, user);
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/user',
    options: {
      transformers,
      body: user,
      ...options
    }
  });
}

export function getUser(options: RequestOptions<User>): Request<User>;
export function getUser(
  options: RequestOptions<Record<User>>
): Request<Record<User>>;
export function getUser(options: RequestOptions<any> = {}): Request<any> {
  const transformers = createTransformers<User>(UserRecord);
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/user',
    options: {
      transformers,
      ...options
    }
  });
}

export function register(
  user: RegisterUser,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function register(
  user: Record<RegisterUser>,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function register(
  user: any,
  options: RequestOptions<EmptyResponse> = {}
): Request<EmptyResponse> {
  const transformers = createTransformers<RegisterUser>(
    RegisterUserRecord,
    user
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/register',
    options: {
      transformers,
      body: user,
      ...options
    }
  });
}

export function login(
  user: LoginUser,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function login(
  user: Record<LoginUser>,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function login(
  user: any,
  options: RequestOptions<EmptyResponse> = {}
): Request<EmptyResponse> {
  const transformers = createTransformers<LoginUser>(LoginUserRecord, user);
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/login',
    options: {
      transformers,
      body: user,
      ...options
    }
  });
}

export function logout(
  options: RequestOptions<EmptyResponse> = {}
): Request<EmptyResponse> {
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/logout',
    options: {
      body: {},
      ...options
    }
  });
}

export function resetPasswordRequest(
  body: ResetPasswordRequest,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function resetPasswordRequest(
  body: Record<ResetPasswordRequest>,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function resetPasswordRequest(
  body: any,
  options: RequestOptions<EmptyResponse> = {}
): Request<EmptyResponse> {
  const transformers = createTransformers<ResetPasswordRequest>(
    undefined,
    body
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/resetPasswordRequest',
    options: {body, transformers, ...options}
  });
}

export function resetPassword(
  body: ResetPassword,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function resetPassword(
  body: Record<ResetPassword>,
  options: RequestOptions<EmptyResponse>
): Request<EmptyResponse>;
export function resetPassword(
  body: any,
  options: RequestOptions<EmptyResponse> = {}
): Request<EmptyResponse> {
  const transformers = createTransformers<ResetPassword>(undefined, body);
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/resetPassword',
    options: {body, transformers, ...options}
  });
}
