import {IdOrAliasOptions, Template} from '@idelic/formatron';

import {useFormatron} from '../context';
import {PromiseInfo, usePromise} from './usePromise';

export const useMonitorTemplate = (
  options: IdOrAliasOptions
): [Template | undefined, PromiseInfo] => {
  const {formatron} = useFormatron();
  const [result, {isLoading, error}] = usePromise(
    () => formatron.getMonitorTemplate(options),
    [formatron]
  );

  return [result, {isLoading, error}];
};
