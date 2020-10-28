import {ITextFieldProps, TextField} from '@fluentui/react/lib/TextField';
import React from 'react';

import {FormatronFormItem} from '../../..';

export interface TextProps {
  item: FormatronFormItem<string>;
  textFieldProps?: ITextFieldProps;
}

export const Text: React.FC<TextProps> = ({item, textFieldProps = {}}) => {
  const {value, setValue, error, dataType} = item;

  return (
    <TextField
      value={value}
      onChange={(_, val) => setValue(val ?? '')}
      label={dataType.label}
      required={dataType.isRequired}
      errorMessage={error}
      {...textFieldProps}
    />
  );
};
