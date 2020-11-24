import {IToggleProps, Toggle} from '@fluentui/react';
import React from 'react';

import {FieldObjectDataType} from '../Form';

export interface BooleanProps {
  field: FieldObjectDataType;
  toggleProps?: IToggleProps;
}

export const Boolean: React.FC<BooleanProps> = ({field, toggleProps = {}}) => {
  const {value, setValue, dataType} = field;

  return (
    <Toggle
      checked={value}
      onChange={(_, checked) => setValue(checked ?? false)}
      label={dataType.label}
      {...toggleProps}
    />
  );
};
