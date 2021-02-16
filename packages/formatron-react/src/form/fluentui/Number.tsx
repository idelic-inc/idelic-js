import {ITextFieldProps, TextField} from '@fluentui/react/lib/TextField';
import {NumberType} from '@idelic/formatron/lib/dataTypes/number';
import React from 'react';

import {FieldObjectDataType} from '../Form';
import {CommonFieldProps} from '../types';

export interface NumberProps extends CommonFieldProps {
  field: FieldObjectDataType<NumberType>;
  textFieldProps?: ITextFieldProps;
}

export const Number: React.FC<NumberProps> = ({
  field,
  textFieldProps = {},
  disabled = false,
  label
}) => {
  const {
    value,
    setValue,
    error,
    dataType,
    setTouched,
    isTouched,
    isRequired,
    isSubmitting
  } = field;

  return (
    <TextField
      value={value ?? ''}
      type='number'
      onChange={(_, val) => setValue(val ? global.Number(val) : undefined)}
      label={label ?? dataType.label}
      disabled={disabled || isSubmitting}
      required={isRequired}
      onBlur={() => setTouched(true)}
      errorMessage={isTouched ? error : undefined}
      {...textFieldProps}
    />
  );
};
