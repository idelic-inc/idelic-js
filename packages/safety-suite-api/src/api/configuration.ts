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
  apiOptions?: ApiOptions
): Request<NestedConfiguration> {
  return runApi<{}, Configuration>({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/configuration/default/nested`,
    apiOptions
  });
}

export function setDefaultConfigItem(
  key: string,
  value: ConfigurationValue,
  apiOptions?: ApiOptions
): Request<{}> {
  return runApi<SetCustomerConfigBody, {}>({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
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
): Request<{}> {
  return runApi<SetCustomerConfigBody, {}>({
    method: 'POST',
    urlRoot: 'loginUrlRoot',
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
): Request<{}> {
  return runApi<{}, {}>({
    method: 'DELETE',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/configuration/customers/${alias}/${key}`,
    apiOptions
  });
}
