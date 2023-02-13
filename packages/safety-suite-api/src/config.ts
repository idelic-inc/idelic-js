import {ApiError} from './error';
import {UrlRoot} from './types';

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
  configServiceUrlRoot: '',
  notificationServiceUrlRoot: ''
};

/**
 * A function to initialize api config with existing config.
 * @param configServiceUrl - URL of the config service
 * @param envUrls - URLS object
 */
export const initializeConfig = (
  configServiceUrl: string,
  envUrls: Record<string, string>
): void => {
  config.configServiceUrlRoot = configServiceUrl;
  config.apiUrlRoot = envUrls['saf-backend'];
  config.dashboardSinkUrlRoot = envUrls['dashboard-sink'];
  config.documentLibraryUrlRoot = envUrls['document-library'];
  config.loginUrlRoot = envUrls['login-backend'];
  config.permissionUrlRoot = envUrls.permission;
  config.userManagementUrlRoot = envUrls['user-management'];
  config.auditLogUrlRoot = envUrls['audit-log'];
  config.claimsSinkUrlRoot = envUrls['claims-sink'];
  config.etlUriBackendRoot = envUrls['etl-uri-backend'];
  config.notificationServiceUrlRoot = envUrls['notification-service'];
  config.initialized = true;
};

/**
 * Setter for the Auth0 access token which is sent with all requests.
 * @param token Auth0 access token
 */
export const setAccessToken = (token: string): void => {
  config.authToken = token;
};
