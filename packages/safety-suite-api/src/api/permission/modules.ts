import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiResponse} from '../../types';
import {Module, ModulePermission} from './types';

/**
 * Gets all `Module`s
 * @param apiOptions Optional options for runApi.
 * @returns Array of `Module` objects.
 */
export const getModules = (
  apiOptions: ApiOptions = {}
): Request<ApiResponse<Module[]>> =>
  runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: '/api/modules',
    apiOptions
  });

/**
 * Gets array of all `ModulePermission`s.
 * @param apiOptions Optional options for runApi.
 * @returns Array of `ModulePermission` objects.
 */
export const getModulePermissions = (
  apiOptions: ApiOptions = {}
): Request<ApiResponse<ModulePermission[]>> =>
  runApi({
    method: 'GET',
    urlRoot: 'permissionUrlRoot',
    route: '/api/modules/permissions',
    apiOptions
  });
