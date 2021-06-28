import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiResponse, CustomerSpecificQuery, Id} from '../../types';
import {User} from './types';

export interface GetUsersQuery extends Partial<CustomerSpecificQuery> {
  /**
   * Filter users by these ids.
   */
  ids?: Id[];
}

/**
 * Get a list of users.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns Array of `User` objects.
 */
export const getUsers = (
  query: GetUsersQuery = {},
  apiOptions?: ApiOptions
): Request<ApiResponse<User[]>> =>
  runApi({
    method: 'GET',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users',
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Get a specific user by id.
 * @param id Get user by this id.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns A single `User` object.
 */
export const getUser = (
  id: Id,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<User>> =>
  runApi({
    method: 'GET',
    urlRoot: 'userManagementUrlRoot',
    route: `/api/users/${id}`,
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Get the current logged in user.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns The `User` object of the currently logged in user.
 */
export const getCurrentUser = (
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<User>> =>
  runApi({
    method: 'GET',
    urlRoot: 'userManagementUrlRoot',
    route: '/api/users/current',
    apiOptions,
    requestOptions: {
      query
    }
  });
