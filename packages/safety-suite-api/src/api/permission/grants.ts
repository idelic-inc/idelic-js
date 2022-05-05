import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiResponse, CustomerSpecificQuery, Id} from '../../types';
import {QueryExportJob} from '../models';
import {DeleteResponse, GrantDTO, InputGrant} from './types';

/**
 * Gets a list of all user grants grouped by customer alias.
 * Requires super admin grant.
 * @param userId ID of the `User` related to the grants.
 * @param apiOptions Optional options for runApi.
 * @returns Array of `Grant` objects.
 */
export const getGrantsGroupedByCustomer = (
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
 * Gets all user grants for a specific customer.
 * @param userId ID of the `User` related to the grants.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns Array of `Grant` objects.
 */
export const getGrants = (
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

/**
 * Start async users export jobs.
 *
 * @param customerAlias - customer alias of desired users.
 * @param apiOptions - Optional options for runApi.
 * @returns - Users export job.
 */
export function runUsersExportJob(
  customerAlias: string,
  apiOptions?: ApiOptions
): Request<ApiResponse<QueryExportJob>> {
  return runApi({
    method: 'POST',
    urlRoot: 'permissionUrlRoot',
    route: `/api/grants/export`,
    apiOptions,
    requestOptions: {
      body: {customerAlias}
    }
  });
}

/**
 * Gets all users export jobs.
 *
 * @param apiOptions - Optional options for runApi.
 * @returns - List of users export jobs.
 */
export function getUsersExportStatus(
  apiOptions?: ApiOptions
): Request<ApiResponse<QueryExportJob[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: `/api/grants/export/status`,
    apiOptions
  });
}

/**
 * Gets users export job by it's uuid.
 *
 * @param uuid - uuid of desired users export job.
 * @param apiOptions - Optional options for runApi.
 * @returns - Users export job object.
 */
export function getUsersExportStatusById(
  uuid: string,
  apiOptions?: ApiOptions
): Request<ApiResponse<QueryExportJob>> {
  return runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: `/api/grants/export/status/${uuid}`,
    apiOptions
  });
}

/**
 * Get users export raw file by uuid.
 *
 * @param uuid - uuid of desired users export job.
 * @param apiOptions - Optional options for runApi.
 * @returns - Export raw file contents.
 */
export function getUsersExportContent(
  uuid: string,
  apiOptions?: ApiOptions
): Request<Blob> {
  return runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: `/api/grants/export/content/${uuid}`,
    apiOptions,
    requestOptions: {
      responseType: 'blob'
    }
  });
}
