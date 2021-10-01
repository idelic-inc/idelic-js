import {useBoolean} from '@fluentui/react-hooks';
import {DependencyList, useCallback, useEffect, useState} from 'react';

export interface PromiseInfo {
  isLoading: boolean;
  error: any;
}
export const usePromise = <T>(
  callback: () => Promise<T> | void | undefined,
  deps: DependencyList = []
): [T | undefined, PromiseInfo] => {
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<any>();
  const [
    isLoading,
    {setTrue: startLoading, setFalse: stopLoading}
  ] = useBoolean(false);
  const getPromise = useCallback(callback, deps);

  useEffect(() => {
    const promise = getPromise();
    if (promise) {
      startLoading();
      promise
        .then(setResult)
        .catch((e) => {
          console.error(e);
          setError(e);
        })
        .finally(stopLoading);
    }
  }, [getPromise, setResult, startLoading, stopLoading, setError]);

  return [result, {isLoading, error}];
};
