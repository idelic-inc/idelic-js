import {Formatron} from '@idelic-js/formatron';
import React, {
  Component,
  ComponentType,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {fieldComponents as vanillaFieldComponents} from './components/form/vanilla';
import {fieldComponents as fluentuiFieldComponents} from './components/form/fluentui';
import {fieldComponents as materialuiFieldComponents} from './components/form/materialui';

export type FieldComponents = Record<string, ComponentType<any>>;

export interface FormatronContext {
  formatron: Formatron<any> | undefined;
  fieldComponents: FieldComponents;
  isReady: boolean;
}

const formatronContext = createContext<FormatronContext>({
  formatron: undefined,
  fieldComponents: {},
  isReady: false
});

export const useFormatron = (): FormatronContext =>
  useContext(formatronContext);

export interface FormatronProviderProps {
  formatron: Formatron<any> | Promise<Formatron<any>>;
  fieldComponents?: FieldComponents;
  /**
   * Which UI framework to use to render the inputs
   * @default vanilla
   */
  framework?: 'vanilla' | 'fluentui' | 'materialui';
}
export const FormatronProvider: React.FC<FormatronProviderProps> = ({
  formatron,
  children,
  fieldComponents = {},
  framework = 'vanilla'
}) => {
  const [client, setClient] = useState<Formatron<any> | undefined>();

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

  useEffect(() => {
    (async () => {
      setClient(formatron instanceof Promise ? await formatron : formatron);
    })();
  }, [formatron, setClient]);

  return (
    <formatronContext.Provider
      value={{
        formatron: client,
        fieldComponents: {
          ...defaultFieldComponents,
          ...fieldComponents
        },
        isReady: !!client
      }}
    >
      {children}
    </formatronContext.Provider>
  );
};
export const FormatronConsumer = formatronContext.Consumer;
