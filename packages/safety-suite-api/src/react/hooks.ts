import net, {Request, Response} from '@idelic/safety-net';
import {DependencyList, useCallback, useEffect, useState} from 'react';

/**
 * A custom hook that handles @idelic/safety-net requests.
 * Response, loading state, cancellation, and errors
 * can all handled with this hook.
 *
 * @param handler - A handler function that may return a net Request
 * @param deps - Dependency array for the handler function
 * @param [errorHandler] - Optional error handler to override the default
 * @returns A tuple of response object, requestInfo
 */
export const useRequest = <R>(
  handler: (request: typeof net.request) => Request<R> | void | undefined,
  deps: DependencyList,
  errorHandler?: (reason: any) => void
): [
  R | undefined,
  {
    isLoading: boolean;
    response: Response<R> | undefined;
    error: any;
  }
] => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const startLoading = useCallback(() => setIsLoading(true), [setIsLoading]);
  const stopLoading = useCallback(() => setIsLoading(false), [setIsLoading]);
  const [response, setResponse] = useState<Response<R>>();
  const [error, setError] = useState<any>();

  // Callbacks
  const defaultErrorHandler = useCallback(
    (e: any) => {
      if (!e.wasCancelled) {
        console.error(e);
        setError(e);
      }
    },
    [setError]
  );
  const errHandler = useCallback(errorHandler ?? defaultErrorHandler, [
    defaultErrorHandler
  ]);
  const reqHandler = useCallback(handler, deps);

  useEffect(() => {
    const request = reqHandler(net.request);
    if (request) {
      startLoading();
      request.response.then(setResponse).catch(errHandler).finally(stopLoading);
    }

    return () => {
      setResponse(undefined);
      setError(undefined);
      if (request) {
        request.cancel();
      }
    };
  }, [
    startLoading,
    stopLoading,
    reqHandler,
    errHandler,
    setResponse,
    setError
  ]);

  return [response?.data, {isLoading, response, error}];
};
