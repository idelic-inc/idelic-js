import {
  AnyModel,
  DataType,
  IdOptions,
  IdOrAliasOptions,
  Model,
  Template
} from '@idelic/formatron';
import {useBoolean} from '@uifabric/react-hooks';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import {useFormatron} from '../context';

type FormValues<M extends AnyModel = AnyModel> = M['fields'];
type FormTouchMap<M extends AnyModel = AnyModel> = {
  [K in keyof M['fields'] | keyof M['relations']]: boolean;
};

const getInitialValues = <M extends AnyModel = AnyModel>(
  template: Template
): FormValues<M> => {
  const values = {} as FormValues<M>;
  template.template.fields.fields.forEach((field) => {
    values[field.name] = field.options?.defaultValue;
  });
  return values;
};
const getInitialTouchMap = <M extends AnyModel = AnyModel>(
  initialValues: FormValues<M>
): FormTouchMap<M> => {
  const map = {} as FormTouchMap<M>;
  Object.keys(initialValues).forEach((key: keyof FormTouchMap<M>) => {
    map[key] = false;
  });
  return map;
};

export interface FormObject<M extends AnyModel = AnyModel> {
  model: Model<M> | undefined;
  template: Template | undefined;
  values: FormValues<M> | undefined;
  setValue: (key: string) => (value: any) => void;
  touched: FormTouchMap<M> | undefined;
  setValueTouched: (key: string) => (isTouched: boolean) => void;
  resetForm: () => void;
  isLoading: boolean;
  isDirty: boolean;
}

export interface ModelOptions {
  model: IdOptions;
}
export interface TemplateOptions {
  template: IdOrAliasOptions;
}
export type ModelOrTemplateOptions = ModelOptions | TemplateOptions;
export const isModelOptions = (
  options: ModelOrTemplateOptions
): options is ModelOptions => !!(options as ModelOptions).model;

export const useForm = <M extends AnyModel = AnyModel>(
  /**
   * Object containing the id or alias of the template
   */
  options: ModelOrTemplateOptions
): FormObject<M> => {
  const {formatron} = useFormatron();
  const [model, setModel] = useState<Model<M>>();
  const [template, setTemplate] = useState<Template>();
  const [
    isLoading,
    {setTrue: startLoading, setFalse: stopLoading}
  ] = useBoolean(false);
  const [values, setValues] = useState<FormValues<M>>();
  const [touched, setTouched] = useState<FormTouchMap<M>>();
  const resetForm = useCallback(() => {
    if (template) {
      const initialValues = merge(
        cloneDeep(model?.fields ?? {}) as FormValues<M>,
        getInitialValues<M>(template)
      );
      const initialTouchMap = getInitialTouchMap<M>(initialValues);
      setValues(initialValues);
      setTouched(initialTouchMap);
    }
  }, [template, model, setValues, setTouched]);
  const setValue = useCallback(
    (key: string) => (value: any) =>
      setValues((currentValues) => {
        if (currentValues) {
          if (Object.keys(currentValues).includes(key)) {
            return {
              ...currentValues,
              [key]: value
            };
          }
          console.error(
            `Cannot update field! Template with id "${template?.id}" has no such field "${key}".`
          );
        }
        console.warn(
          'Wait until the form has finished loading before updating fields.'
        );
        return currentValues;
      }),
    [setValues, template]
  );
  const setValueTouched = useCallback(
    (key: string) => (isTouched = true) =>
      setTouched((currentTouched) => {
        if (currentTouched) {
          if (Object.keys(currentTouched).includes(key)) {
            return {
              ...currentTouched,
              [key]: isTouched
            };
          }
          console.error(
            `Cannot touch field! Template with id "${template?.id}" has no such field "${key}".`
          );
        }
        console.warn(
          'Wait until the form has finished loading before touching fields.'
        );
        return currentTouched;
      }),
    [setValues]
  );
  const isDirty = useMemo(
    () =>
      template && values ? !isEqual(values, getInitialValues(template)) : false,
    [template, values]
  );

  // Fetch template and optional model
  useEffect(() => {
    startLoading();
    if (isModelOptions(options)) {
      formatron
        .getModel<M>(options.model)
        .then((m) => {
          setModel(m);
          return m.getTemplate();
        })
        .then(setTemplate)
        .catch(console.error)
        .finally(stopLoading);
    } else {
      formatron
        .getModelTemplate(options.template)
        .then(setTemplate)
        .catch(console.error)
        .finally(stopLoading);
    }
  }, [formatron, setTemplate, setModel, startLoading, stopLoading]);
  // Initialize form
  useEffect(() => {
    if (!isLoading && !values) {
      resetForm();
    }
  }, [isLoading, values, resetForm]);

  return {
    model,
    template,
    values,
    isLoading,
    resetForm,
    setValue,
    touched,
    setValueTouched,
    isDirty
  };
};

export interface FormProps {
  form: FormObject;
  formProps?: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
}

const formContext = createContext<FormObject>({
  model: undefined,
  template: undefined,
  values: undefined,
  isLoading: false,
  resetForm: () => {},
  setValue: () => () => {},
  touched: undefined,
  setValueTouched: () => () => {},
  isDirty: false
});

export const useFormContext = <M extends AnyModel = AnyModel>(): FormObject<
  M
> => useContext(formContext as Context<FormObject<M>>);

export const Form: React.FC<FormProps> = ({form, children, formProps}) => (
  <formContext.Provider value={form}>
    <form {...formProps}>{children}</form>
  </formContext.Provider>
);

export interface FieldObject {
  value: any;
  setValue: (value: any) => void;
  dataType: DataType | undefined;
  error: any;
}
export interface FieldObjectDataType<D extends DataType = DataType>
  extends Omit<FieldObject, 'dataType'> {
  dataType: D;
}

export const useField = (key: string): FieldObject => {
  const {values, setValue: createSetValue, template} = useFormContext();
  const value: any = useMemo(() => values?.[key], [values]);
  const setValue = useCallback(createSetValue(key), [createSetValue]);
  const dataType = useMemo(() => template?.getDataType(key), [template]);

  return {value, setValue, dataType, error: undefined};
};
