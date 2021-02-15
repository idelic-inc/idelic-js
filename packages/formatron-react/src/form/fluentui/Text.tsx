import {ITextFieldProps, TextField} from '@fluentui/react/lib/TextField';
import React from 'react';

import {FieldObjectDataType} from '../Form';
import {CommonFieldProps} from '../types';

export interface TextProps extends CommonFieldProps {
  field: FieldObjectDataType;
  textFieldProps?: ITextFieldProps;
}

export const Text: React.FC<TextProps> = ({
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
      value={value}
      onChange={(_, val) => setValue(val ?? '')}
      label={label ?? dataType.label}
      disabled={disabled || isSubmitting}
      required={isRequired}
      onBlur={() => setTouched(true)}
      errorMessage={isTouched ? error : undefined}
      {...textFieldProps}
    />
  );
};
