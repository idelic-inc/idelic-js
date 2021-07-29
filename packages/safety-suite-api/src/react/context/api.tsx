import {Request} from '@idelic/safety-net';
import {mergeDeep} from 'immutable';
import React, {
  createContext,
  DependencyList,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import * as api from '../../index';
import {ApiOptions} from '../../types';
import {useRequest} from '../hooks';

export interface ApiContext {
  isReady: boolean;
  accessToken: string | undefined;
  safetySuiteApi: typeof api;
  setAccessToken: (accessToken: string) => void;
}

const apiContext = createContext<ApiContext>({
  isReady: false,
  accessToken: undefined,
  safetySuiteApi: api,
  setAccessToken: () => {}
});

export interface ApiProviderProps {
  initialAccessToken?: string;
}

export const useApi = (): ApiContext => useContext(apiContext);
export const ApiProvider: React.FC<ApiProviderProps> = ({
  initialAccessToken,
  children
}) => {
  const [accessToken, setAccessToken] = useState(initialAccessToken);
  const safetySuiteApi = useMemo(() => api, []);

  useEffect(() => {
    if (typeof accessToken === 'string') {
      safetySuiteApi.setAccessToken(accessToken);
    }
  }, [accessToken]);

  return (
    <apiContext.Provider
      value={{
        isReady: !!accessToken,
        accessToken,
        safetySuiteApi,
        setAccessToken
      }}
    >
      {children}
    </apiContext.Provider>
  );
};

/**
 * A custom hook that handles @idelic/safety-suite-api requests.
 * Response, loading state, cancellation, progress, and errors
 * can all handled with this hook.
 *
 * @param handler - A handler function that may return a net Request
 * @param deps - Dependency array for the handler function
 * @param [errorHandler] - Optional error handler to override the default
 * @returns A tuple of response object, requestInfo
 */
export const useApiCall = <R extends any>(
  handler: (
    safetySuiteApi: typeof api,
    withUploadProgress: (options?: ApiOptions) => ApiOptions
  ) => Request<R> | void | undefined,
  deps: DependencyList,
  errorHandler?: (reason: any) => void
): [
  R | undefined,
  {
    isLoading: boolean;
    progress: number;
    error: any;
  }
] => {
  // State
  const [progress, setProgress] = useState(0);
  const {safetySuiteApi, isReady} = useApi();

  // Callbacks
  const handleProgress = useCallback(
    (e: ProgressEvent) => setProgress(e.loaded / e.total),
    [setProgress]
  );
  const withUploadProgress = useCallback(
    (options: ApiOptions = {}) =>
      mergeDeep(options, {
        on: {
          uploadProgress: handleProgress
        }
      }),
    [handleProgress]
  );

  const [data, info] = useRequest<R>(
    () => (isReady ? handler(safetySuiteApi, withUploadProgress) : undefined),
    [isReady, safetySuiteApi, withUploadProgress, ...deps],
    errorHandler
  );
  const requestInfo = useMemo(
    () => ({
      ...info,
      progress
    }),
    [info, progress]
  );

  return [data, requestInfo];
};
