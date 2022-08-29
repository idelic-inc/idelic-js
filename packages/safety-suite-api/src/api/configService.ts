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

export type ConfigSpec = {
  key: string;
  storageType: string;
  value: string;
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
