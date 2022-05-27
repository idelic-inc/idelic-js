import {Request} from '@idelic/safety-net';
import {ApiOptions, ApiSuccessResponse} from 'src/types';

import {runApi} from '../runApi';

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
