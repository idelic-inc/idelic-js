import React from 'react';
import {IToggleProps, Toggle} from '@fluentui/react';

import {FormatronFormItem} from '../../..';

export interface BooleanProps {
  item: FormatronFormItem<boolean>;
  toggleProps?: IToggleProps;
}

export const Boolean: React.FC<BooleanProps> = ({item, toggleProps = {}}) => {
  const {value, setValue, dataType} = item;

  return (
    <Toggle
      checked={value}
      onChange={(_, checked) => setValue(checked ?? false)}
      label={dataType.label}
      {...toggleProps}
    />
  );
};
