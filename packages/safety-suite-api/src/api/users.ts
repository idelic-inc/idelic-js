import {Request} from 'idelic-safety-net';
import {List, Record} from 'immutable';

import {runApi} from '../runApi';
import {ApiOptions} from '../types';
import {
  createRecordListResponseTransformer,
  createRecordResponseTransformer
} from '../utils';

export interface UserPermission {
  customerId: number;
  viewData: boolean;
  manageUsers: boolean;
  viewDocuments?: boolean;
  downloadDocuments?: boolean;
  uploadDocuments?: boolean;
  editDocuments?: boolean;
  deleteDocuments?: boolean;
  admin?: boolean;
  allowProtected?: boolean;
  readGroupPermissions?: number[];
  writeGroupPermissions?: number[];
}

export type ImUserPermission = Omit<
  UserPermission,
  'readGroupPermissions' | 'writeGroupPermissions'
> & {
  readGroupPermissions?: List<number>;
  writeGroupPermissions?: List<number>;
};

export interface InputUser {
  email: string;
  firstName: string;
  lastName: string;
  permissions: UserPermission[];
}

export type ImInputUser = Omit<InputUser, 'permissions'> & {
  permissions: List<Record<ImUserPermission>>;
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

export interface UserWithErrors {
  user: User;
  failedCustomers: number[];
}

export interface ImUser extends Omit<User, 'permissions'> {
  permissions: List<Record<ImUserPermission>>;
}

export interface ImUserWithErrors
  extends Omit<UserWithErrors, 'user' | 'failedCustomers'> {
  user: Record<ImUser>;
  failedCustomers: List<number>;
}

export const UserPermissionRecord = Record<ImUserPermission>({
  customerId: -1,
  viewData: false,
  manageUsers: false,
  viewDocuments: false,
  downloadDocuments: false,
  uploadDocuments: false,
  editDocuments: false,
  deleteDocuments: false,
  admin: undefined,
  allowProtected: undefined,
  readGroupPermissions: List(),
  writeGroupPermissions: List()
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

export const UserWithErrorsRecord = Record<ImUserWithErrors>({
  user: UserRecord(),
  failedCustomers: List<number>()
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

export function getUser(
  userId: number,
  apiOptions?: ApiOptions
): Request<UserWithErrors>;
export function getUser(
  userId: number,
  apiOptions?: ApiOptions
): Request<Record<ImUserWithErrors>>;
export function getUser(
  userId: number,
  apiOptions: ApiOptions = {}
): Request<UserWithErrors | Record<ImUserWithErrors>> {
  const transformers = createRecordResponseTransformer<ImUserWithErrors>(
    apiOptions.useImmutable,
    UserWithErrorsRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/users/${userId}`,
    apiOptions,
    requestOptions: {transformers}
  });
}

export function updateUser(
  user: User,
  apiOptions?: ApiOptions
): Request<UserWithErrors>;
export function updateUser(
  user: Record<ImUser>,
  apiOptions?: ApiOptions
): Request<Record<ImUserWithErrors>>;
export function updateUser(
  user: User | Record<ImUser>,
  apiOptions: ApiOptions = {}
): Request<UserWithErrors | Record<ImUserWithErrors>> {
  const transformers = createRecordResponseTransformer<ImUserWithErrors>(
    apiOptions.useImmutable,
    UserWithErrorsRecord
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
