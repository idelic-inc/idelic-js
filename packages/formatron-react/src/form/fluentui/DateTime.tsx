import {
  DatePicker,
  getTheme,
  IDatePickerProps,
  TextField
} from '@fluentui/react';
import {DateTimeType} from '@idelic/formatron/lib/dataTypes/dateTime';
import moment from 'moment';
import React from 'react';

import {FieldObjectDataType} from '../Form';
import {CommonFieldProps} from '../types';
import {ErrorText} from './extras/ErrorText';

const {
  semanticColors: {errorText: errorColor}
} = getTheme();

export interface DateTimeProps extends CommonFieldProps {
  field: FieldObjectDataType<DateTimeType>;
  datePickerProps?: IDatePickerProps;
}

export const DateTime: React.FC<DateTimeProps> = ({
  field,
  datePickerProps = {},
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

  return dataType.dateType === 'time' ? (
    <TextField
      onChange={(_, val) => setValue(moment(val, ['h:m', 'H:m']).unix())}
      value={value ? moment.unix(value).format('HH:mm') : undefined}
      label={label ?? dataType.label}
      required={isRequired}
      disabled={disabled || isSubmitting}
      onBlur={() => setTouched(true)}
      errorMessage={isTouched ? error : ''}
      type='time'
    />
  ) : (
    <div>
      <DatePicker
        value={value ? moment.unix(value).toDate() : undefined}
        onSelectDate={(date) => setValue(date ? date.getTime() / 1000 : null)}
        label={label ?? dataType.label}
        isRequired={isRequired}
        disabled={disabled || isSubmitting}
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
