import {getNestedGlobalValues, NestedConfig, NestedConfiguration} from './api';
import {ApiError} from './error';
import {ApiOptions, UrlRoot} from './types';

export type Config = {[R in UrlRoot]: string} & {
  authToken?: string;
  onAuthError(error: ApiError): void;
};

export type InitConfig = Config & {
  initialized: boolean;
};

export const config: InitConfig = {
  apiUrlRoot: '',
  auditLogUrlRoot: '',
  claimsSinkUrlRoot: '',
  dashboardSinkUrlRoot: '',
  documentLibraryUrlRoot: '',
  initialized: false,
  loginUrlRoot: '',
  onAuthError: () => {},
  permissionUrlRoot: '',
  userManagementUrlRoot: '',
  etlUriBackendRoot: '',
  configServiceUrlRoot: ''
};

/**
 * A function to initialize api config with an existing nested config,
 * otherwise use setupApi instead.
 * @param configUrl - URL of the config service
 * @param nestedConfig - Nested config object
 */
export const initializeConfig = (
  configServiceUrl: string,
  nestedConfig: Record<string, Record<string, NestedConfig>>
): void => {
  const urls = nestedConfig.env.urls as Record<string, string>;
  config.configServiceUrlRoot = configServiceUrl;
  config.apiUrlRoot = urls['saf-backend'];
  config.dashboardSinkUrlRoot = urls['dashboard-sink'];
  config.documentLibraryUrlRoot = urls['document-library'];
  config.loginUrlRoot = urls['login-backend'];
  config.permissionUrlRoot = urls.permission;
  config.userManagementUrlRoot = urls['user-management'];
  config.auditLogUrlRoot = urls['audit-log'];
  config.claimsSinkUrlRoot = urls['claims-sink'];
  config.etlUriBackendRoot = urls['etl-uri-backend'];
  config.initialized = true;
};

/**
 * A function that pulls config, sets up api config,
 * then returns a nested config object.
 * @param configServiceUrl - URL of the config service
 * @param [customerAlias] - Optional customer alias to fetch config for, otherwise pulls default config
 */
export const setupApi = async (
  configServiceUrl: string,
  customerAlias?: string
): Promise<NestedConfiguration> => {
  const apiOptions: ApiOptions = {
    bypassInitializeCheck: true,
    customUrlRoot: configServiceUrl
  };
  const {data} = await getNestedGlobalValues(customerAlias, apiOptions)
    .response;
  const nestedConfig = data._embedded;
  if (!nestedConfig) {
    throw new Error('Error fetching config.');
  }
  initializeConfig(configServiceUrl, nestedConfig);
  return nestedConfig;
};

/**
 * Setter for the Auth0 access token which is sent with all requests.
 * @param token Auth0 access token
 */
export const setAccessToken = (token: string): void => {
  config.authToken = token;
};
