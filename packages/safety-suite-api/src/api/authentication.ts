import {Request} from 'idelic-safety-net';
import {Record} from 'immutable';

import {ApiOptions, EmptyResponse} from '../types';
import {runApi} from '../runApi';
import {
  createRecordRequestTransformer,
  createRecordTransformers
} from '../utils';
import {InputUser, ImInputUser, ImUser, User, UserRecord} from './users';

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

export function invite(user: InputUser, apiOptions?: ApiOptions): Request<User>;
export function invite(
  user: Record<ImInputUser>,
  apiOptions?: ApiOptions
): Request<Record<ImUser>>;
export function invite(
  user: InputUser | Record<ImInputUser>,
  apiOptions: ApiOptions = {}
): Request<User | Record<ImUser>> {
  const transformers = createRecordTransformers<ImInputUser, ImUser>(
    apiOptions.useImmutable,
    UserRecord
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/invite',
    apiOptions,
    requestOptions: {
      body: user,
      transformers
    }
  });
}

export function resendInvite(
  body: User,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function resendInvite(
  body: Record<ImUser>,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function resendInvite(
  body: User | Record<ImUser>,
  apiOptions: ApiOptions = {}
): Request<EmptyResponse> {
  const transformers = createRecordRequestTransformer<ImUser>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/resendInvite',
    apiOptions,
    requestOptions: {body, transformers}
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
