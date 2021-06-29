import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiResponse, CustomerSpecificQuery} from '../../types';
import {UserPermissions} from './types';

/**
 * Gets `UserPermissions` object for the current user.
 * @param query Object containing query params for this route.
 * @param apiOptions Optional options for runApi.
 * @returns `UserPermissions` object.
 */
export const getCurrentUserPermissions = (
  query: CustomerSpecificQuery,
  apiOptions: ApiOptions = {}
): Request<ApiResponse<UserPermissions>> =>
  runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: '/api/permissions/user/current',
    apiOptions,
    requestOptions: {
      query
    }
  });
