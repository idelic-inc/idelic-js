import React from 'react';
import {DatePicker, getTheme, IDatePickerProps, Text} from '@fluentui/react';

import {FormatronFormItem} from '../../..';
import {ErrorText} from './extras/ErrorText';

const {
  semanticColors: {errorBackground: errorColor}
} = getTheme();

export interface DateTimeProps {
  item: FormatronFormItem<number>;
  datePickerProps?: IDatePickerProps;
}

export const DateTime: React.FC<DateTimeProps> = ({
  item,
  datePickerProps = {}
}) => {
  const {value, setValue, error, dataType} = item;

  return (
    <div>
      <DatePicker
        value={new Date(value)}
        onSelectDate={(val) => setValue((val?.getTime() ?? 0) / 1000)}
        label={dataType.label}
        isRequired={dataType.isRequired}
        textField={
          !!error
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
