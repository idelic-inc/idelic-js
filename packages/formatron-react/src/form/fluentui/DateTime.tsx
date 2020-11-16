import {DatePicker, getTheme, IDatePickerProps} from '@fluentui/react';
import React from 'react';

import {FieldObjectDataType} from '../ModelForm';
import {ErrorText} from './extras/ErrorText';

const {
  semanticColors: {errorBackground: errorColor}
} = getTheme();

export interface DateTimeProps {
  field: FieldObjectDataType;
  datePickerProps?: IDatePickerProps;
}

export const DateTime: React.FC<DateTimeProps> = ({
  field,
  datePickerProps = {}
}) => {
  const {value, setValue, error, dataType} = field;

  return (
    <div>
      <DatePicker
        value={new Date(value)}
        onSelectDate={(val) => setValue((val?.getTime() ?? 0) / 1000)}
        label={dataType.label}
        isRequired={dataType.isRequired}
        textField={
          error
            ? {
                styles: {
                  fieldGroup: {
                    borderColor: errorColor,
                    '&:hover': {borderColor: errorColor},
                    '&:focused': {borderColor: errorColor}
                  }
                }
              }
            : {}
        }
        {...datePickerProps}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
