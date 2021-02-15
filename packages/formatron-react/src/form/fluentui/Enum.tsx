import {
  ChoiceGroup,
  Dropdown,
  IChoiceGroupOption,
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
const enumValuesToChoiceGroupOptions = (
  values: EnumValueType[]
): IChoiceGroupOption[] =>
  values.map((value) => ({
    key: value.alias,
    text: value.display,
    disabled: value.disabled
  }));

export interface EnumProps extends CommonFieldProps {
  field: FieldObjectDataType<EnumType>;
  /**
   * Displays the enum values as radio buttons instead of a dropdown.
   */
  radio?: boolean;
  dropDownProps?: Partial<IDropdownProps>;
}

export const Enum: React.FC<EnumProps> = ({
  field,
  dropDownProps = {},
  disabled = false,
  radio = false,
  label
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

  return radio ? (
    <ChoiceGroup
      label={label ?? dataType.label ?? enumItem?.display}
      options={enumItem ? enumValuesToChoiceGroupOptions(enumItem.values) : []}
      selectedKey={value}
      onChange={(_, option) => {
        setValue(option?.key);
      }}
      required={isRequired}
      onBlur={() => setTouched(true)}
      disabled={disabled || isLoading || !!error || isSubmitting}
    />
  ) : (
    <Dropdown
      label={label ?? dataType.label ?? enumItem?.display}
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
