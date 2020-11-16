import {IdOrAliasOptions, Template} from '@idelic/formatron';
import {useBoolean} from '@uifabric/react-hooks';
import {useEffect, useState} from 'react';

import {useFormatron} from '../context';

export const useModelTemplate = (options: IdOrAliasOptions) => {
  const [template, setTemplate] = useState<Template>();
  const [error, setError] = useState<any>();
  const [
    isLoading,
    {setTrue: startLoading, setFalse: stopLoading}
  ] = useBoolean(false);
  const {formatron} = useFormatron();

  useEffect(() => {
    startLoading();
    formatron
      .getModelTemplate(options)
      .then(setTemplate)
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(stopLoading);
  }, [formatron, setTemplate, startLoading, stopLoading, setError]);

  return [template, {isLoading, error}];
};
