import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiResponse, CustomerSpecificQuery, Id} from '../../types';
import {DeleteResponse, GrantDTO, InputGrant} from './types';

/**
 * Gets a list of all user grant grouped by customer alias.
 * Requires super admin grant.
 * @param userId ID of the `User` related to the grant.
 * @param apiOptions Optional options for runApi.
 * @returns Array of `Role` objects.
 */
export const getGrantGroupedByCustomer = (
  userId: Id,
  apiOptions?: ApiOptions
): Request<ApiResponse<Record<string, GrantDTO[]>>> =>
  runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: `/api/grants/${userId}`,
    apiOptions
  });

/**
 * Gets a specific `Grant`
 * @param userId ID of the `User` related to the grant.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns A single `Grant` object.
 */
export const getGrant = (
  userId: Id,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<GrantDTO[]>> =>
  runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: `/api/grants/${userId}`,
    apiOptions,
    requestOptions: {
      query
    }
  });

/**
 * Creates a new `Grant`
 * @param inputGrant An `InputGrant` object.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns The created `Grant` object.
 */
export const createGrant = (
  inputGrant: InputGrant,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<GrantDTO>> =>
  runApi({
    method: 'POST',
    urlRoot: 'permissionUrlRoot',
    route: '/api/grants',
    apiOptions,
    requestOptions: {
      body: inputGrant,
      query
    }
  });

/**
 * Create multiple `Grant`s simultaneously.
 * @param inputGrants An array of `InputGrant` objects.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns An array of the created `Grant` objects.
 */
export const bulkCreateGrant = (
  inputGrants: InputGrant[],
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<GrantDTO[]>> =>
  runApi({
    method: 'POST',
    urlRoot: 'permissionUrlRoot',
    route: '/api/grants/bulk',
    apiOptions,
    requestOptions: {
      body: inputGrants,
      query
    }
  });

/**
 * Update a specific `Grant`
 * @param grant A `GrantDTO` object to update.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns An updated `Grant` object.
 */
export const updateGrant = (
  grant: GrantDTO,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<GrantDTO>> =>
  runApi({
    method: 'PUT',
    urlRoot: 'permissionUrlRoot',
    route: '/api/grants',
    apiOptions,
    requestOptions: {
      body: grant,
      query
    }
  });

/**
 * Update multiple `Grant`s simultaneously.
 * @param grants An array of `InputGrant` objects.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns An array of the updated `Grant` objects.
 */
export const bulkUpdateGrant = (
  grants: InputGrant[],
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<GrantDTO[]>> =>
  runApi({
    method: 'PUT',
    urlRoot: 'permissionUrlRoot',
    route: '/api/grants/bulk',
    apiOptions,
    requestOptions: {
      body: grants,
      query
    }
  });

/**
 * Delete a specific grant by id.
 * @param id Id of `Grant` to delete.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns An object containing the ID of the deleted `Grant` object.
 */
export const deleteGrant = (
  id: Id,
  query: CustomerSpecificQuery,
  apiOptions?: ApiOptions
): Request<ApiResponse<DeleteResponse>> =>
  runApi({
    method: 'DELETE',
    urlRoot: 'permissionUrlRoot',
    route: `/api/grants/${id}`,
    apiOptions,
    requestOptions: {
      query
    }
  });
