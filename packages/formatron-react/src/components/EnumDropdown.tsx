import {
  Dropdown,
  IDropdownOption,
  IDropdownProps,
  Shimmer
} from '@fluentui/react';
import {EnumValueType} from '@idelic/formatron';
import React from 'react';

import {useEnum} from '../hooks/useEnum';

const enumValuesToDropdownOptions = (
  values: EnumValueType[]
): IDropdownOption[] =>
  values.map((value) => ({
    key: value.alias,
    text: value.display,
    disabled: value.disabled
  }));

export interface EnumDropdownProps extends Omit<IDropdownProps, 'options'> {
  enumAlias: string;
}

export const EnumDropdown: React.FC<EnumDropdownProps> = ({
  enumAlias,
  ...props
}) => {
  const [enumItem, {isLoading, error}] = useEnum({alias: enumAlias});

  return (
    <Dropdown
      label={enumItem?.display}
      options={enumItem ? enumValuesToDropdownOptions(enumItem.values) : []}
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
      disabled={isLoading || !!error}
      errorMessage={error?.message}
      {...props}
    />
  );
};
