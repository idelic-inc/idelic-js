import React, {useMemo} from 'react';
import {useFormatron} from 'src/context';

import {FormatronFormItem} from '../..';

export interface FieldProps<T> {
  item: FormatronFormItem<T>;
}

export const Field = <T extends any>({item}: FieldProps<T>) => {
  const {fieldComponents} = useFormatron();
  const FieldComponent = useMemo(() => fieldComponents[item.dataType.type], [
    item
  ]);
  return <FieldComponent item={item} />;
};
