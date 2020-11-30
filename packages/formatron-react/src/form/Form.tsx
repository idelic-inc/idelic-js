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
  [K in keyof M['fields']]: boolean;
};
type FormErrorMap<M extends AnyModel = AnyModel> = {
  [K in keyof M['fields']]: string | undefined;
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
const getInitialErrorMap = <M extends AnyModel = AnyModel>(
  initialValues: FormValues<M>
): FormErrorMap<M> => {
  const map = {} as FormErrorMap<M>;
  Object.keys(initialValues).forEach((key: keyof FormErrorMap<M>) => {
    map[key] = undefined;
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
  errors: FormErrorMap<M> | undefined;
  setValueError: (key: string) => (error: string | undefined) => void;
  resetForm: () => void;
  isLoading: boolean;
  isValid: boolean;
  isDirty: boolean;
  validationModel?: M;
  isSubmitting: boolean;
  startSubmitting: () => void;
  stopSubmitting: () => void;
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
  options: ModelOrTemplateOptions,
  /**
   * Optional model to be used with a template form for async validation
   */
  validationModel?: M
): FormObject<M> => {
  const {formatron} = useFormatron();
  const [model, setModel] = useState<Model<M>>();
  const [template, setTemplate] = useState<Template>();
  const [
    isLoading,
    {setTrue: startLoading, setFalse: stopLoading}
  ] = useBoolean(false);
  const [
    isSubmitting,
    {setTrue: startSubmitting, setFalse: stopSubmitting}
  ] = useBoolean(false);
  const [values, setValues] = useState<FormValues<M>>();
  const [touched, setTouched] = useState<FormTouchMap<M>>();
  const [errors, setErrors] = useState<FormErrorMap<M>>();
  const resetForm = useCallback(() => {
    if (template) {
      const initialValues = merge(
        cloneDeep(model?.fields ?? {}) as FormValues<M>,
        getInitialValues<M>(template)
      );
      const initialTouchMap = getInitialTouchMap<M>(initialValues);
      const initialErrorMap = getInitialErrorMap<M>(initialValues);
      setValues(initialValues);
      setTouched(initialTouchMap);
      setErrors(initialErrorMap);
    }
  }, [template, model, setValues, setTouched, setErrors]);
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
          return currentValues;
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
          return currentTouched;
        }
        console.warn(
          'Wait until the form has finished loading before touching fields.'
        );
        return currentTouched;
      }),
    [setTouched]
  );
  const setValueError = useCallback(
    (key: string) => (error: string | undefined) =>
      setErrors((currentErrors) => {
        if (currentErrors) {
          if (Object.keys(currentErrors).includes(key)) {
            return {
              ...currentErrors,
              [key]: error
            };
          }
          console.error(
            `Cannot set error for field! Template with id "${template?.id}" has no such field "${key}".`
          );
          return currentErrors;
        }
        console.warn(
          'Wait until the form has finished loading before setting errors on fields.'
        );
        return currentErrors;
      }),
    [setErrors]
  );
  const isDirty = useMemo(
    () =>
      template && values ? !isEqual(values, getInitialValues(template)) : false,
    [template, values]
  );
  const isValid = useMemo(
    () =>
      errors
        ? !Object.values(errors).some((error) => typeof error === 'string')
        : false,
    [errors]
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
    errors,
    setValueError,
    isLoading,
    resetForm,
    setValue,
    touched,
    setValueTouched,
    isDirty,
    validationModel,
    isValid,
    isSubmitting,
    startSubmitting,
    stopSubmitting
  };
};

export interface FormProps {
  form: FormObject;
  formProps?: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
  onSubmit?: () => void | Promise<any>;
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
  errors: undefined,
  setValueError: () => () => {},
  isDirty: false,
  isValid: false,
  isSubmitting: false,
  startSubmitting: () => {},
  stopSubmitting: () => {}
});

export const useFormContext = <M extends AnyModel = AnyModel>(): FormObject<
  M
> => useContext(formContext as Context<FormObject<M>>);

export const Form: React.FC<FormProps> = ({
  form,
  children,
  formProps,
  onSubmit
}) => {
  const {startSubmitting, stopSubmitting} = form;
  const onFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      startSubmitting();
      const result = onSubmit?.();
      if (result instanceof Promise) {
        result.finally(stopSubmitting);
      } else {
        stopSubmitting();
      }
    },
    [onSubmit, startSubmitting, stopSubmitting]
  );
  return (
    <formContext.Provider value={form}>
      <form {...formProps} onSubmit={onFormSubmit}>
        {children}
      </form>
    </formContext.Provider>
  );
};

export interface FieldObject {
  value: any;
  setValue: (value: any) => void;
  dataType: DataType | undefined;
  isTouched: boolean;
  setTouched: (touched: boolean) => void;
  isRequired: boolean;
  error: string | undefined;
}
export interface FieldObjectDataType<D extends DataType = DataType>
  extends Omit<FieldObject, 'dataType'> {
  dataType: D;
}

export const useField = (key: string): FieldObject => {
  const {
    values,
    setValue: createSetValue,
    template,
    setValueTouched,
    touched,
    errors,
    setValueError,
    model,
    isLoading,
    validationModel
  } = useFormContext();
  const value: any = useMemo(() => values?.[key], [values]);
  const isTouched = useMemo(() => touched?.[key] ?? false, [touched]);
  const error = useMemo(() => errors?.[key], [errors]);
  const setValue = useCallback(createSetValue(key), [createSetValue]);
  const setTouched = useCallback(setValueTouched(key), [setValueTouched]);
  const dataType = useMemo(() => template?.getDataType(key), [template]);
  const isRequired = useMemo(
    () =>
      isLoading
        ? false
        : dataType?.isRequired(model?.model ?? validationModel) ?? false,
    [model, isLoading, dataType, validationModel]
  );

  useEffect(() => {
    if (dataType) {
      setValueError(key)(
        dataType.validate(value, model?.model ?? validationModel) ?? undefined
      );
    }
  }, [value, setValueError, dataType, model, validationModel]);

  return {value, setValue, dataType, setTouched, isTouched, error, isRequired};
};
