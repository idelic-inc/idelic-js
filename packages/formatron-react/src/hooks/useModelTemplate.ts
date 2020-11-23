import {IdOrAliasOptions} from '@idelic/formatron';

import {useFormatron} from '../context';
import {usePromise} from './usePromise';

export const useModelTemplate = (options: IdOrAliasOptions) => {
  const {formatron} = useFormatron();
  const result = usePromise(() => formatron.getModelTemplate(options), [
    formatron
  ]);

  return result;
};
