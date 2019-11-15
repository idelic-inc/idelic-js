import {Request} from 'idelic-safety-net';
import {List, Record} from 'immutable';
import {runApi} from '../runApi';

import {
  createRecordResponseTransformer,
  createRecordListResponseTransformer
} from '../utils';

import {ApiOptions} from '../types';

export interface UserPermission {
  customerId: number;
  viewData: boolean;
  manageUsers: boolean;
}

export interface InputUser {
  email: string;
  firstName: string;
  lastName: string;
  permissions: UserPermission[];
}

export type ImInputUser = Omit<InputUser, 'permissions'> & {
  permissions: List<Record<UserPermission>>;
};

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  admin: boolean;
  lockout: boolean;
  registered: boolean;
  active: boolean;
  permissions: UserPermission[];
}

export type ImUser = Omit<User, 'permissions'> & {
  permissions: List<Record<UserPermission>>;
};

export const UserPermissionRecord = Record<UserPermission>({
  customerId: -1,
  viewData: false,
  manageUsers: false
});

export const InputUserRecord = Record<ImInputUser>({
  email: '',
  firstName: '',
  lastName: '',
  permissions: List([UserPermissionRecord()])
});

export const UserRecord = Record<ImUser>({
  id: -1,
  email: '',
  firstName: '',
  lastName: '',
  admin: false,
  lockout: false,
  registered: false,
  active: false,
  permissions: List([UserPermissionRecord()])
});

export function getCurrentUser(apiOptions?: ApiOptions): Request<User>;
export function getCurrentUser(
  apiOptions?: ApiOptions
): Request<Record<ImUser>>;
export function getCurrentUser(
  apiOptions: ApiOptions = {}
): Request<User | Record<ImUser>> {
  const transformers = createRecordResponseTransformer<ImUser>(
    apiOptions.useImmutable,
    UserRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/users/current',
    apiOptions,
    requestOptions: {transformers}
  });
}

export function getUsers(apiOptions?: ApiOptions): Request<User[]>;
export function getUsers(
  apiOptions?: ApiOptions
): Request<List<Record<ImUser>>>;
export function getUsers(
  apiOptions: ApiOptions = {}
): Request<User[] | List<Record<ImUser>>> {
  const transformers = createRecordListResponseTransformer<ImUser>(
    apiOptions.useImmutable,
    UserRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/users',
    apiOptions,
    requestOptions: {transformers}
  });
}

export function updateUser(user: User, apiOptions?: ApiOptions): Request<User>;
export function updateUser(
  user: Record<ImUser>,
  apiOptions?: ApiOptions
): Request<Record<ImUser>>;
export function updateUser(
  user: User | Record<ImUser>,
  apiOptions: ApiOptions = {}
): Request<User | Record<ImUser>> {
  const transformers = createRecordResponseTransformer<ImUser>(
    apiOptions.useImmutable,
    UserRecord
  );
  return runApi({
    method: 'PUT',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/users',
    apiOptions,
    requestOptions: {
      body: user,
      transformers
    }
  });
}
