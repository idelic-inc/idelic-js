import {
  getCustomerNestedConfig,
  getDefaultNestedConfig,
  NestedConfiguration
} from './api';
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
  initialized: false,
  apiUrlRoot: '',
  loginUrlRoot: '',
  configUrlRoot: '',
  documentLibraryUrlRoot: '',
  eformsUrlRoot: '',
  onAuthError: () => {}
};

export interface BasicConfig extends NestedConfiguration {
  services: {
    saf: {
      proDataIrv: string;
      url: string;
    };
    embeddedReporting: {
      defaultDashboardId: string;
      url: string;
      enabled: boolean;
      watchlist: {dashboardId: string; enabled: boolean};
    };
    documentLibrary: {
      url: string;
      maxUploadSize: number;
    };
    app: {
      frontendUrl: string;
      url: string;
    };
    training: {
      enabled: boolean;
      frontendUrl: string;
    };
    eforms: {
      frontendUrl: string;
      maxUploadSize: number;
      url: string;
      hellosignClientId: string;
    };
  };
  env: {
    sentry: {dsn: string};
    auth0: {
      clientId: string;
      internal: {clientId: string};
      domain: string;
      audience: string;
    };
    gtm: {containerId: string};
  };
}
const exampleConfig: BasicConfig = {
  services: {
    embeddedReporting: {
      watchlist: {dashboardId: '', enabled: false},
      defaultDashboardId: '',
      url: '',
      enabled: false
    },
    saf: {proDataIrv: '', url: ''},
    documentLibrary: {url: '', maxUploadSize: 0},
    app: {frontendUrl: '', url: ''},
    training: {frontendUrl: '', enabled: false},
    eforms: {frontendUrl: '', maxUploadSize: 0, url: '', hellosignClientId: ''}
  },
  env: {
    sentry: {dsn: ''},
    auth0: {
      clientId: '',
      internal: {clientId: ''},
      domain: '',
      audience: ''
    },
    gtm: {containerId: ''}
  }
};

const matchesConfig = <T extends NestedConfiguration>(
  conf: NestedConfiguration,
  example: T,
  keyPath: string[] = []
): conf is T => {
  let result = true;
  Object.entries(example).forEach(([key, exampleValue]) => {
    const value = conf[key];
    const type = typeof value;
    const exampleType = typeof exampleValue;
    const path = [...keyPath, key];
    let isCorrect = false;
    if (type === 'undefined') {
      result = false;
      isCorrect = true;
      console.warn(`Item "${path.join('.')}" is missing in the config!`);
    } else if (typeof exampleValue === 'object' && typeof value === 'object') {
      isCorrect = matchesConfig(value, exampleValue, path);
    } else if (
      (exampleType === 'string' && type === 'string') ||
      (exampleType === 'number' && type === 'number') ||
      (exampleType === 'boolean' && type === 'boolean')
    ) {
      isCorrect = true;
    }
    if (!isCorrect) {
      result = false;
      console.warn(
        `Type of config item "${path.join(
          '.'
        )}" is incorrect, expected ${exampleType}`
      );
    }
  });
  return result;
};

/**
 * Type guard to ensure the received config matches the expected structure
 * @param conf - Nested config from config service
 * @param example - Example to compare conf to
 */
export function isConfig(conf: NestedConfiguration): conf is BasicConfig;
export function isConfig<T extends NestedConfiguration>(
  conf: NestedConfiguration,
  example: T
): conf is T;
export function isConfig(conf: NestedConfiguration, example = exampleConfig) {
  return matchesConfig(conf, example);
}

/**
 * A function to initialize api config with an existing nested config,
 * otherwise use setupApi instead.
 * @param configUrl - URL of the config service
 * @param nestedConfig - Nested config object
 */
export const initializeConfig = (
  configUrl: string,
  nestedConfig: NestedConfiguration
): void => {
  if (
    !matchesConfig(nestedConfig, {
      services: {
        app: {url: ''},
        documentLibrary: {url: ''},
        eforms: {url: ''},
        saf: {url: ''}
      }
    })
  ) {
    throw new Error("Config doesn't match!");
  }
  config.configUrlRoot = configUrl;
  config.apiUrlRoot = nestedConfig.services.saf.url;
  config.loginUrlRoot = nestedConfig.services.app.url;
  config.documentLibraryUrlRoot = nestedConfig.services.documentLibrary.url;
  config.eformsUrlRoot = nestedConfig.services.eforms.url;
  config.initialized = true;
};

/**
 * A function that pulls config, sets up api config,
 * then returns a nested config object.
 * @param configUrl - URL of the config service
 * @param [customerAlias] - Optional customer alias to fetch config for, otherwise pulls default config
 */
export const setupApi = async (
  configUrl: string,
  customerAlias?: string
): Promise<NestedConfiguration> => {
  const apiOptions: ApiOptions = {
    bypassInitializeCheck: true,
    customUrlRoot: configUrl
  };
  const configRequest = customerAlias
    ? getCustomerNestedConfig(customerAlias, apiOptions)
    : getDefaultNestedConfig(apiOptions);
  const {data: nestedConfig} = await configRequest.response;
  initializeConfig(configUrl, nestedConfig);
  return nestedConfig;
};

/**
 * Setter for the Auth0 access token which is sent with all requests.
 * @param token Auth0 access token
 */
export const setAccessToken = (token: string): void => {
  config.authToken = token;
};
