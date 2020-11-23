import {DatePicker, getTheme, IDatePickerProps} from '@fluentui/react';
import {unix} from 'moment';
import React from 'react';

import {FieldObjectDataType} from '../Form';
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
        value={value ? unix(value).toDate() : undefined}
        onSelectDate={(date) => setValue(date ? date.getTime() / 1000 : null)}
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
