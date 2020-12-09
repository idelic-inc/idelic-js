import {DatePicker, getTheme, IDatePickerProps} from '@fluentui/react';
import {unix} from 'moment';
import React from 'react';

import {FieldObjectDataType} from '../Form';
import {ErrorText} from './extras/ErrorText';

const {
  semanticColors: {errorText: errorColor}
} = getTheme();

export interface DateTimeProps {
  field: FieldObjectDataType;
  datePickerProps?: IDatePickerProps;
}

export const DateTime: React.FC<DateTimeProps> = ({
  field,
  datePickerProps = {}
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
    <div>
      <DatePicker
        value={value ? unix(value).toDate() : undefined}
        onSelectDate={(date) => setValue(date ? date.getTime() / 1000 : null)}
        label={dataType.label}
        isRequired={isRequired}
        disabled={isSubmitting}
        allowTextInput
        onBlur={() => setTouched(true)}
        textField={
          error && isTouched
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
      {error && isTouched && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
