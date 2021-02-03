import {
  Dropdown,
  IDropdownOption,
  IDropdownProps,
  Shimmer
} from '@fluentui/react';
import {EnumValueType} from '@idelic/formatron';
import {EnumType} from '@idelic/formatron/lib/dataTypes/enum';
import React from 'react';

import {useEnum} from '../../hooks/useEnum';
import {FieldObjectDataType} from '../Form';
import {CommonFieldProps} from '../types';

const enumValuesToDropdownOptions = (
  values: EnumValueType[]
): IDropdownOption[] =>
  values.map((value) => ({
    key: value.alias,
    text: value.display,
    disabled: value.disabled
  }));

export interface EnumProps extends CommonFieldProps {
  field: FieldObjectDataType<EnumType>;
  dropDownProps?: Partial<IDropdownProps>;
}

export const Enum: React.FC<EnumProps> = ({
  field,
  dropDownProps = {},
  disabled = false
}) => {
  const {
    value,
    setValue,
    error: errorMessage,
    dataType,
    setTouched,
    isTouched,
    isRequired,
    isSubmitting
  } = field;
  const [enumItem, {isLoading, error}] = useEnum({id: dataType.id});

  return (
    <Dropdown
      label={enumItem?.display}
      options={enumItem ? enumValuesToDropdownOptions(enumItem.values) : []}
      selectedKey={[value]}
      onRenderLabel={
        isLoading
          ? () => (
              <Shimmer
                styles={{
                  root: {height: 19, padding: '5px 0', width: '33%'}
                }}
              />
            )
          : undefined
      }
      onChange={(_, option) => {
        setValue(option?.key);
      }}
      required={isRequired}
      onBlur={() => setTouched(true)}
      disabled={disabled || isLoading || !!error || isSubmitting}
      errorMessage={error?.message ?? isTouched ? errorMessage : undefined}
      {...dropDownProps}
    />
  );
};
