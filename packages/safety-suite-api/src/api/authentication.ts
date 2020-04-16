import {Request} from 'idelic-safety-net';
import {Record} from 'immutable';

import {ApiOptions, EmptyResponse} from '../types';
import {runApi} from '../runApi';
import {
  createRecordRequestTransformer,
  createRecordTransformers
} from '../utils';
import {
  InputUser,
  ImInputUser,
  ImUser,
  User,
  ImUserWithErrors,
  UserWithErrorsRecord,
  UserWithErrors
} from './users';

export interface ChangePasswordRequest {
  email: string;
}
export interface ValidateTokenRequest {
  customerAlias: string;
  manageUsers: boolean;
}

export const ChangePasswordRequestRecord = Record<ChangePasswordRequest>({
  email: ''
});
export const ValidateTokenRequestRecord = Record<ValidateTokenRequest>({
  customerAlias: '',
  manageUsers: false
});

export function invite(
  user: InputUser,
  apiOptions?: ApiOptions
): Request<UserWithErrors>;
export function invite(
  user: Record<ImInputUser>,
  apiOptions?: ApiOptions
): Request<Record<ImUserWithErrors>>;
export function invite(
  user: InputUser | Record<ImInputUser>,
  apiOptions: ApiOptions = {}
): Request<UserWithErrors | Record<ImUserWithErrors>> {
  const transformers = createRecordTransformers<ImInputUser, ImUserWithErrors>(
    apiOptions.useImmutable,
    UserWithErrorsRecord
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

export function changePassword(
  body: ChangePasswordRequest,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function changePassword(
  body: Record<ChangePasswordRequest>,
  apiOptions?: ApiOptions
): Request<EmptyResponse>;
export function changePassword(
  body: ChangePasswordRequest | Record<ChangePasswordRequest>,
  apiOptions: ApiOptions = {}
): Request<EmptyResponse> {
  const transformers = createRecordRequestTransformer<ChangePasswordRequest>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/changePassword',
    apiOptions,
    requestOptions: {body, transformers}
  });
}

export function validateToken(
  body: ValidateTokenRequest,
  apiOptions?: ApiOptions
): Request<number>;
export function validateToken(
  body: Record<ValidateTokenRequest>,
  apiOptions?: ApiOptions
): Request<number>;
export function validateToken(
  body: ValidateTokenRequest | Record<ValidateTokenRequest>,
  apiOptions: ApiOptions = {}
): Request<number> {
  const transformers = createRecordRequestTransformer<ValidateTokenRequest>(
    apiOptions.useImmutable
  );
  return runApi({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/authentication/validateToken',
    apiOptions,
    requestOptions: {body, transformers}
  });
}
