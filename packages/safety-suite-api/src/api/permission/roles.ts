import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiResponse, CustomerSpecificQuery, Id} from '../../types';
import {DeleteResponse, InputRole, Role} from './types';

export interface GetRolesQuery extends CustomerSpecificQuery {
  /**
   * Defines whether the response should include
   * `createdByUserName` and `lastUpdatedByUserName` or not.
   */
  includeUserNames?: boolean;
  /**
   * Defines whether the response should include `usersCount` or not.
   */
  includeUsersCount?: boolean;
}

/**
 * Gets a list of all available roles for a specific customer.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns Array of `Role` objects.
 */
export const getRoles = (
  query: GetRolesQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<Role[]>> =>
  runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: '/api/roles',
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Updates a role.
 * @param role `Role` object to update.
 * @param apiOptions Optional options for runApi.
 * @returns The updated `Role` object.
 */
export const updateRole = (
  role: Role,
  apiOptions?: ApiOptions
): Request<ApiResponse<Role>> =>
  runApi({
    method: 'PUT',
    urlRoot: 'permissionUrlRoot',
    route: '/api/roles',
    apiOptions,
    requestOptions: {
      body: role
    }
  });

/**
 * Creates a new role.
 * @param inputRole `InputRole` object.
 * @param role `Role` object to update.
 * @param apiOptions Optional options for runApi.
 * @returns The created `Role` object.
 */
export const createRole = (
  inputRole: InputRole,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<Role>> =>
  runApi({
    method: 'POST',
    urlRoot: 'permissionUrlRoot',
    route: '/api/roles',
    apiOptions,
    requestOptions: {
      body: inputRole,
      query
    }
  });

/**
 * Get a specific role by id.
 * @param id Id of `Role` to get.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns A single `Role` object.
 */
export const getRole = (
  id: Id,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<Role>> =>
  runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: `/api/roles/${id}`,
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Delete a specific role by id.
 * @param id Id of `Role` to delete.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns An object containing the ID of the deleted `Role` object.
 */
export const deleteRole = (
  id: Id,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DeleteResponse>> =>
  runApi({
    method: 'DELETE',
    urlRoot: 'permissionUrlRoot',
    route: `/api/roles/${id}`,
    apiOptions,
    requestOptions: {
      query
    }
  });
