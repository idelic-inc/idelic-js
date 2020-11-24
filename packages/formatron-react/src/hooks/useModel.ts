import {AnyModel, IdOptions} from '@idelic/formatron';

import {useFormatron} from '../context';
import {usePromise} from './usePromise';

export const useModel = <M extends AnyModel = AnyModel>(options: IdOptions) => {
  const {formatron} = useFormatron();
  const result = usePromise(() => formatron.getModel<M>(options), [formatron]);

  return result;
};
