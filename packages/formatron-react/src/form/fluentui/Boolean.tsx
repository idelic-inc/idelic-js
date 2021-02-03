import {IToggleProps, Toggle} from '@fluentui/react';
import React from 'react';

import {FieldObjectDataType} from '../Form';
import {CommonFieldProps} from '../types';

export interface BooleanProps extends CommonFieldProps {
  field: FieldObjectDataType;
  toggleProps?: IToggleProps;
}

export const Boolean: React.FC<BooleanProps> = ({
  field,
  toggleProps = {},
  disabled = false
}) => {
  const {value, setValue, dataType, isSubmitting} = field;

  return (
    <Toggle
      checked={value}
      onChange={(_, checked) => setValue(checked ?? false)}
      label={dataType.label}
      disabled={disabled || isSubmitting}
      {...toggleProps}
    />
  );
};
