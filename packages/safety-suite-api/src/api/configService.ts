import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {ApiOptions, ApiSuccessResponse} from '../types';

export function getConfigTypes(
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<string[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'configServiceUrlRoot',
    route: '/api/configuration',
    apiOptions
  });
}

export function getConfigTypeNames(
  type: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<string[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'configServiceUrlRoot',
    route: `/api/configuration/${type}`,
    apiOptions
  });
}

export type ConfigSpec<Value = any> = {
  key: string;
  storageType: string;
  value: Value;
  valueType: string;
  valueOptions?: {
    itemValueType: string;
    itemValueOptions: string;
    values: string[];
  };
};

export type ConfigType = {
  type: string;
  name: string;
  spec: ConfigSpec[];
};

export interface NestedConfig {
  [key: string]: string | NestedConfig;
}

export type ConfigValues = Record<string, any>;

export function getConfigTypeWithName(
  type: string,
  name: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<ConfigType>> {
  return runApi({
    method: 'GET',
    urlRoot: 'configServiceUrlRoot',
    route: `/api/configuration/${type}/${name}`,
    apiOptions
  });
}

export function createConfigTypeWithName(
  spec: ConfigSpec,
  type: string,
  name: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<ConfigType>> {
  return runApi({
    method: 'PUT',
    urlRoot: 'configServiceUrlRoot',
    route: `/api/configuration/${type}/${name}`,
    requestOptions: {
      body: spec
    },
    apiOptions
  });
}

export function getConfigValues(
  type: string,
  name: string,
  override?: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<ConfigValues>> {
  return runApi({
    method: 'GET',
    urlRoot: 'configServiceUrlRoot',
    route: `/api/configuration/${type}/${name}/values`,
    requestOptions: {
      query: {
        override
      }
    },
    apiOptions
  });
}

export function updateConfigValues(
  values: ConfigValues,
  type: string,
  name: string,
  override?: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<ConfigType>> {
  return runApi({
    method: 'PATCH',
    urlRoot: 'configServiceUrlRoot',
    route: `/api/configuration/${type}/${name}/values`,
    requestOptions: {
      body: values,
      query: {
        override
      }
    },
    apiOptions
  });
}

export function getConfigOverrides(
  type: string,
  name: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<string[]>> {
  return runApi({
    method: 'GET',
    urlRoot: 'configServiceUrlRoot',
    route: '/api/configuration/overrides',
    requestOptions: {
      query: {
        configurationType: type,
        name
      }
    },
    apiOptions
  });
}

/**
 * Gets nested global public config values.
 *
 * @param override Override string.
 * @param apiOptions Optional options for runApi.
 */
export function getNestedGlobalValues(
  override?: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<Record<string, Record<string, NestedConfig>>>> {
  return runApi({
    method: 'GET',
    route: '/api/global/configuration/values',
    urlRoot: 'configServiceUrlRoot',
    requestOptions: {
      query: {
        override,
        nested: true
      }
    },
    apiOptions
  });
}

/**
 * Gets config values. (Can only be used by super-admins)
 *
 * @param type Config type.
 * @param name Config name.
 * @param override Override string.
 * @param apiOptions Optional options for runApi.
 */
export function getConfigValuesV2(
  type: string,
  name: string,
  override?: string,
  apiOptions?: ApiOptions
): Request<ApiSuccessResponse<Record<string, string>>> {
  return runApi({
    method: 'GET',
    route: `/api/configuration/v2/${type}/${name}/values`,
    urlRoot: 'configServiceUrlRoot',
    requestOptions: {
      query: {
        override
      }
    },
    apiOptions
  });
}

/**
 * Gets nested config values. (Can only be used by super-admins)
 *
 * @param type Config type.
 * @param name Config name.
 * @param override Override string.
 * @param apiOptions Optional options for runApi.
 */
export function getNestedConfigValuesV2<
  Type extends string,
  Name extends string
>(
  type: Type,
  name: Name,
  override?: string,
  apiOptions?: ApiOptions
): Request<
  ApiSuccessResponse<Record<Type, Record<Name, Record<string, string>>>>
> {
  return runApi({
    method: 'GET',
    route: `/api/configuration/v2/${type}/${name}/values`,
    urlRoot: 'configServiceUrlRoot',
    requestOptions: {
      query: {
        override,
        nested: true
      }
    },
    apiOptions
  });
}
