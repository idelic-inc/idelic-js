import {DataInterface, DataType, Formatron} from '@idelic/formatron';
import React, {ComponentType, createContext, useContext, useMemo} from 'react';

import {fieldComponents as fluentuiFieldComponents} from './form/fluentui';
import {fieldComponents as materialuiFieldComponents} from './form/materialui';
import {fieldComponents as vanillaFieldComponents} from './form/vanilla';

export type FieldComponents = Record<string, ComponentType<any>>;

export interface FormatronContext {
  formatron: Formatron;
  fieldComponents: FieldComponents;
}

const formatronContext = createContext<FormatronContext>({
  fieldComponents: {}
} as FormatronContext);

export const useFormatron = (): FormatronContext =>
  useContext(formatronContext);

export interface FormatronProviderProps {
  dataInterface: DataInterface;
  dataTypes?: typeof DataType[];
  /**
   * Custom components for rendering form fields
   */
  fieldComponents?: FieldComponents;
  /**
   * Which UI framework to use to render the inputs
   * @default vanilla
   */
  framework?: 'vanilla' | 'fluentui' | 'materialui';
}
export const FormatronProvider: React.FC<FormatronProviderProps> = ({
  dataInterface,
  dataTypes,
  children,
  fieldComponents = {},
  framework = 'vanilla'
}) => {
  const formatron = useMemo(() => new Formatron(dataInterface, dataTypes), [
    dataInterface,
    dataTypes
  ]);

  const defaultFieldComponents = useMemo<FieldComponents>(() => {
    switch (framework) {
      case 'fluentui': {
        return fluentuiFieldComponents;
      }
      case 'materialui': {
        return materialuiFieldComponents;
      }
      case 'vanilla':
      default: {
        return vanillaFieldComponents;
      }
    }
  }, [framework]);

  return (
    <formatronContext.Provider
      value={{
        formatron,
        fieldComponents: {
          ...defaultFieldComponents,
          ...fieldComponents
        }
      }}
    >
      {children}
    </formatronContext.Provider>
  );
};
export const FormatronConsumer = formatronContext.Consumer;
