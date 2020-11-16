import {AnyModel, DataType, IdOptions, Model} from '@idelic/formatron';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import React, {
  Context,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import {useModel, usePromise} from '../hooks';

type ModelFormValues<M extends AnyModel = AnyModel> = Readonly<
  M['fields'] & M['relations']
>;
type ModelFormTouchMap<M extends AnyModel = AnyModel> = {
  [K in keyof M['fields'] | keyof M['relations']]: boolean;
};

const getInitialValues = <M extends AnyModel = AnyModel>(
  model: Model<M>
): ModelFormValues<M> => cloneDeep({...model.fields, ...model.relations});
const getInitialTouchMap = <M extends AnyModel = AnyModel>(
  initialValues: ModelFormValues<M>
): ModelFormTouchMap<M> => {
  const map = {} as ModelFormTouchMap<M>;
  Object.keys(initialValues).forEach((key: keyof ModelFormTouchMap<M>) => {
    map[key] = false;
  });
  return map;
};

export interface ModelFormObject<M extends AnyModel = AnyModel> {
  model: Model<M> | undefined;
  values: ModelFormValues<M> | undefined;
  setValue: (key: string) => (value: any) => void;
  touched: ModelFormTouchMap<M> | undefined;
  setValueTouched: (key: string) => (isTouched: boolean) => void;
  resetForm: () => void;
  isLoading: boolean;
  isDirty: boolean;
}

export const useModelForm = <M extends AnyModel = AnyModel>(
  /**
   * Object containing the id of the model
   */
  options: IdOptions
): ModelFormObject<M> => {
  const [model, {isLoading}] = useModel<M>(options);
  const [values, setValues] = useState<ModelFormValues<M>>();
  const [touched, setTouched] = useState<ModelFormTouchMap<M>>();
  const resetForm = useCallback(() => {
    if (model) {
      const initialValues = getInitialValues(model);
      const initialTouchMap = getInitialTouchMap<M>(initialValues);
      setValues(initialValues);
      setTouched(initialTouchMap);
    }
  }, [model, setValues, setTouched]);
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
            `Cannot update field! Model with id "${options.id}" has no such field "${key}".`
          );
        }
        console.warn(
          'Wait until the form has finished loading before updating fields.'
        );
        return currentValues;
      }),
    [setValues]
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
            `Cannot touch field! Model with id "${options.id}" has no such field "${key}".`
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
    () => (model && values ? !isEqual(values, getInitialValues(model)) : false),
    [model, values]
  );

  // Initialize form
  useEffect(() => {
    if (model && !isLoading && !values) {
      resetForm();
    }
  }, [model, isLoading, values, resetForm]);

  return {
    model,
    values,
    isLoading,
    resetForm,
    setValue,
    touched,
    setValueTouched,
    isDirty
  };
};

export interface ModelFormProps {
  form: ModelFormObject;
}

const modelFormContext = createContext<ModelFormObject>({
  model: undefined,
  values: undefined,
  isLoading: false,
  resetForm: () => {},
  setValue: () => () => {},
  touched: undefined,
  setValueTouched: () => () => {},
  isDirty: false
});

export const useForm = <M extends AnyModel = AnyModel>(): ModelFormObject<M> =>
  useContext(modelFormContext as Context<ModelFormObject<M>>);

export const ModelForm: React.FC<ModelFormProps> = ({form, children}) => (
  <modelFormContext.Provider value={form}>
    <form>{children}</form>
  </modelFormContext.Provider>
);

export interface FieldObject {
  value: any;
  setValue: (value: any) => void;
  dataType: DataType | undefined;
  isLoading: boolean;
  error: any;
}
export interface FieldObjectDataType<D extends DataType = DataType>
  extends Omit<FieldObject, 'dataType'> {
  dataType: D;
}

export const useField = (key: string): FieldObject => {
  const {values, setValue: createSetValue, model} = useForm();
  const value: any = useMemo(() => value[key], [values]);
  const setValue = useCallback(createSetValue(key), [createSetValue]);
  const [dataType, {isLoading}] = usePromise(() => model?.getDataType(key), [
    model
  ]);

  return {value, setValue, dataType, isLoading, error: undefined};
};
