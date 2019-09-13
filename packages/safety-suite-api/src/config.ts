import ApiError from 'src/error';

export type Config = {
  apiUrlRoot: string;
  loginUrlRoot: string;
  onAuthError(error: ApiError): void;
};

export type _Config = Config & {
  initialized: boolean;
};

export let config: _Config = {
  initialized: false,
  apiUrlRoot: '',
  loginUrlRoot: '',
  onAuthError: () => {}
};

export function initializeConfig(newConfig: Config): void {
  config = {
    ...newConfig,
    initialized: true
  };
}
