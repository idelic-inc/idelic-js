import {IdOrAliasOptions} from '@idelic/formatron';

import {useFormatron} from '../context';
import {usePromise} from './usePromise';

export const useEnum = (options: IdOrAliasOptions) => {
  const {formatron} = useFormatron();
  const result = usePromise(() => formatron.getEnum(options), [formatron]);

  return result;
};
