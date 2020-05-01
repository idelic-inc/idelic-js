import {ApiError} from './error';
import {UrlRoot} from './types';

export type Config = {[R in UrlRoot]: string} & {
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
  documentLibraryUrlRoot: '',
  authToken: '',
  onAuthError: () => {}
};

export function initializeConfig(newConfig: Config): void {
  config = {
    ...newConfig,
    initialized: true
  };
}
