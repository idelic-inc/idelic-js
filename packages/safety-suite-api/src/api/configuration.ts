import {Request} from 'idelic-safety-net';

import {runApi} from '../runApi';
import {ApiOptions} from '../types';

export type ConfigurationValue = string | number | boolean;
export type Configuration = Record<string, ConfigurationValue>;
export type NestedConfiguration = {
  [property: string]: ConfigurationValue | NestedConfiguration;
};

export interface SetCustomerConfigBody {
  value: ConfigurationValue;
}

export function getDefaultConfig(
  apiOptions?: ApiOptions
): Request<Configuration> {
  return runApi<{}, Configuration>({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/configuration/default`,
    apiOptions
  });
}

export function getDefaultNestedConfig(
  alias: string,
  apiOptions?: ApiOptions
): Request<NestedConfiguration> {
  return runApi<{}, Configuration>({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/configuration/default/nested`,
    apiOptions
  });
}

export function getCustomerConfig(
  alias: string,
  apiOptions?: ApiOptions
): Request<Configuration> {
  return runApi<{}, Configuration>({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}`,
    apiOptions
  });
}

export function getCustomerNestedConfig(
  alias: string,
  apiOptions?: ApiOptions
): Request<NestedConfiguration> {
  return runApi<{}, Configuration>({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}/nested`,
    apiOptions
  });
}

export function setCustomerConfigItem(
  alias: string,
  key: string,
  value: ConfigurationValue,
  apiOptions?: ApiOptions
): Request<Configuration> {
  return runApi<SetCustomerConfigBody, Configuration>({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}/${key}`,
    requestOptions: {
      body: {value}
    },
    apiOptions
  });
}
