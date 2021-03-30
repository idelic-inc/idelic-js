import {IdOrAliasOptions, Template} from '@idelic/formatron';

import {useFormatron} from '../context';
import {PromiseInfo, usePromise} from './usePromise';

export const useModelTemplate = (
  options: IdOrAliasOptions
): [Template | undefined, PromiseInfo] => {
  const {formatron} = useFormatron();
  const [result, {isLoading, error}] = usePromise(
    () => formatron.getModelTemplate(options),
    [formatron]
  );

  return [result, {isLoading, error}];
};
