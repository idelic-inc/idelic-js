import {Request} from 'idelic-safety-net';

import {runApi} from '../runApi';
import {ApiOptions, EmptyRequest, EmptyResponse} from '../types';

export type ConfigurationValue = string | number | boolean;
export type Configuration = Record<string, ConfigurationValue>;
export type NestedConfiguration = {
  [property: string]: ConfigurationValue | NestedConfiguration | undefined;
};

export interface SetCustomerConfigBody {
  value: ConfigurationValue;
}

export function getDefaultConfig(
  apiOptions?: ApiOptions
): Request<Configuration> {
  return runApi<EmptyRequest, Configuration>({
    method: 'GET',
    urlRoot: 'configUrlRoot',
    route: `/api/1.0/configuration/default`,
    apiOptions
  });
}

export function getDefaultNestedConfig(
  apiOptions?: ApiOptions
): Request<NestedConfiguration> {
  return runApi<EmptyRequest, Configuration>({
    method: 'GET',
    urlRoot: 'configUrlRoot',
    route: `/api/1.0/configuration/default/nested`,
    apiOptions
  });
}

export function setDefaultConfigItem(
  key: string,
  value: ConfigurationValue,
  apiOptions?: ApiOptions
): Request<EmptyResponse> {
  return runApi<SetCustomerConfigBody, EmptyResponse>({
    method: 'POST',
    urlRoot: 'configUrlRoot',
    route: `/api/1.0/configuration/default/${key}`,
    requestOptions: {
      body: {value}
    },
    apiOptions
  });
}

export function getCustomerConfig(
  alias: string,
  apiOptions?: ApiOptions
): Request<Configuration> {
  return runApi<EmptyRequest, Configuration>({
    method: 'GET',
    urlRoot: 'configUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}`,
    apiOptions
  });
}

export function getCustomerNestedConfig(
  alias: string,
  apiOptions?: ApiOptions
): Request<NestedConfiguration> {
  return runApi<EmptyRequest, Configuration>({
    method: 'GET',
    urlRoot: 'configUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}/nested`,
    apiOptions
  });
}

export function setCustomerConfigItem(
  alias: string,
  key: string,
  value: ConfigurationValue,
  apiOptions?: ApiOptions
): Request<EmptyResponse> {
  return runApi<SetCustomerConfigBody, EmptyResponse>({
    method: 'POST',
    urlRoot: 'configUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}/${key}`,
    requestOptions: {
      body: {value}
    },
    apiOptions
  });
}

export function resetCustomerConfigItem(
  alias: string,
  key: string,
  apiOptions?: ApiOptions
): Request<EmptyResponse> {
  return runApi<EmptyRequest, EmptyResponse>({
    method: 'DELETE',
    urlRoot: 'configUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}/${key}`,
    apiOptions
  });
}
