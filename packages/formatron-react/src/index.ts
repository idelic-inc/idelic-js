import {DataType, Model, Template} from '@idelic-js/formatron';
import {useCallback, useMemo, useState} from 'react';
import {isEqual} from 'lodash';

export type TouchedMap<F> = {
  [K in keyof F]: boolean;
};
export type ErrorMap<F> = {
  [K in keyof F]: string | undefined;
};
export interface FormatronFormItem<T> {
  value: T;
  touched: boolean;
  touch: () => void;
  error: string | undefined;
  setValue: (value: T) => void;
  dataType: DataType;
}
export type FormatronForm<F> = {
  [K in keyof F]: FormatronFormItem<F[K]>;
};

export const useEditForm = <M extends Model<any>>(model: M) => {
  const [fields, setFields] = useState<M['fields']>(() => model.fields);
  const [touched, setTouched] = useState<TouchedMap<M['fields']>>(() => {
    const map = {} as TouchedMap<M['fields']>;
    Object.keys(model.fields).forEach((key: keyof M['fields']) => {
      map[key] = false;
    });
    return map;
  });
  const [errors, setErrors] = useState<ErrorMap<M['fields']>>(() => {
    const map = {} as ErrorMap<M['fields']>;
    Object.keys(model.fields).forEach((key: keyof M['fields']) => {
      map[key] = undefined;
    });
    return map;
  });
  const form = useMemo(() => {
    const map = {} as FormatronForm<M['fields']>;
    Object.keys(fields).forEach((key: keyof M['fields']) => {
      const dataType: DataType = model.getDataType(key);
      map[key] = {
        value: fields[key],
        touched: touched[key],
        touch: () => setTouched((prev) => ({...prev, [key]: true})),
        error: errors[key],
        setValue: (value) => {
          setErrors((prev) => ({...prev, [key]: dataType.validate(value)}));
          setFields((prev) => ({...prev, [key]: value}));
        },
        dataType
      };
    });
    return map;
  }, [fields, touched, setTouched, errors, setFields]);
  const dirty = useMemo(() => !isEqual(fields, model.fields), [fields]);

  return {form, fields, dirty};
};

export * from './context';
export * from './components/form';
