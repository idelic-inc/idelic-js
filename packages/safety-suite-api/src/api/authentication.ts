import {Request} from 'idelic-safety-net';
import {Record} from 'immutable';

import {ApiOptions, EmptyResponse} from '../types';
import {runApi} from '../runApi';
import {
  createRecordTransformers,
  createRecordRequestTransformer,
  createRecordResponseTransformer
} from '../utils';

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
  token: string;
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
  token: '',
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
  apiOptions: ApiOptions
): Request<User>;
export function createUser(
  user: Record<InputUser>,
  apiOptions: ApiOptions
): Request<Record<User>>;
export function createUser(
  user: InputUser | Record<InputUser>,
  apiOptions: ApiOptions = {}
): Request<User | Record<User>> {
  const transformers = createRecordTransformers<InputUser, User>(
    apiOptions.useImmutable,
    UserRecord
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/user',
    apiOptions,
    requestOptions: {
      body: user,
      transformers
    }
  });
}

export function getUser(apiOptions?: ApiOptions): Request<User>;
export function getUser(apiOptions?: ApiOptions): Request<Record<User>>;
export function getUser(
  apiOptions: ApiOptions = {}
): Request<User | Record<User>> {
  const transformers = createRecordResponseTransformer<User>(
    apiOptions.useImmutable,
    UserRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/user',
    apiOptions,
    requestOptions: {transformers}
  });
}

export function register(
  user: RegisterUser,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function register(
  user: Record<RegisterUser>,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function register(
  user: RegisterUser | Record<RegisterUser>,
  apiOptions: ApiOptions = {}
): Request<EmptyResponse> {
  const transformers = createRecordRequestTransformer<RegisterUser>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/register',
    apiOptions,
    requestOptions: {
      body: user,
      transformers
    }
  });
}

export function login(
  user: LoginUser,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function login(
  user: Record<LoginUser>,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function login(
  user: LoginUser | Record<LoginUser>,
  apiOptions: ApiOptions = {}
): Request<EmptyResponse> {
  const transformers = createRecordRequestTransformer<LoginUser>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/login',
    apiOptions,
    requestOptions: {
      body: user,
      transformers
    }
  });
}

export function logout(apiOptions?: ApiOptions): Request<EmptyResponse> {
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/logout',
    apiOptions,
    requestOptions: {body: {}}
  });
}

export function resetPasswordRequest(
  body: ResetPasswordRequest,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function resetPasswordRequest(
  body: Record<ResetPasswordRequest>,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function resetPasswordRequest(
  body: ResetPasswordRequest | Record<ResetPasswordRequest>,
  apiOptions: ApiOptions = {}
): Request<EmptyResponse> {
  const transformers = createRecordRequestTransformer<ResetPasswordRequest>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/resetPasswordRequest',
    apiOptions,
    requestOptions: {body, transformers}
  });
}

export function resetPassword(
  body: ResetPassword,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function resetPassword(
  body: Record<ResetPassword>,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function resetPassword(
  body: ResetPassword | Record<ResetPassword>,
  apiOptions: ApiOptions = {}
): Request<EmptyResponse> {
  const transformers = createRecordRequestTransformer<ResetPassword>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/resetPassword',
    apiOptions,
    requestOptions: {body, transformers}
  });
}
