import {IdOrAliasOptions} from '@idelic/formatron';

import {useFormatron} from '../context';
import {usePromise} from './usePromise';

export const useMonitorTemplate = (options: IdOrAliasOptions) => {
  const {formatron} = useFormatron();
  const result = usePromise(() => formatron.getMonitorTemplate(options), [
    formatron
  ]);

  return result;
};
