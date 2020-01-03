import {ApiError} from './error';

export type Config = {
  apiUrlRoot: string;
  loginUrlRoot: string;
  authToken?: string;
  onAuthError(error: ApiError): void;
};

export type _Config = Config & {
  initialized: boolean;
};

export let config: _Config = {
  initialized: false,
  apiUrlRoot: '',
  loginUrlRoot: '',
  authToken: '',
  onAuthError: () => {}
};

export function initializeConfig(newConfig: Config): void {
  config = {
    ...newConfig,
    initialized: true
  };
}
