import {List, Record} from 'immutable';

export type ApiTransformers<T> = {
  request?: (data: Record<T>) => T;
  response?: (data: T) => Record<T>;
};

export type ListApiTransformers<T> = {
  request?: (data: List<Record<T>>) => T[];
  response?: (data: T[]) => List<Record<T>>;
};

export function createTransformers<T>(
  Factory?: Record.Factory<T>,
  requestBody?: T | Record<T>
): ApiTransformers<T> {
  const isImmtuable = Record.isRecord(requestBody);
  return {
    request:
      requestBody === undefined || !isImmtuable
        ? undefined
        : (data: Record<T>) => data.toJS(),

    response:
      Factory === undefined || !isImmtuable
        ? undefined
        : (data: T) => Factory(data)
  };
}

export function createListTransformers<T>(
  Factory?: Record.Factory<T>,
  requestBody?: T[] | List<Record<T>>
): ListApiTransformers<T> {
  const isImmutable = List.isList(requestBody);
  return {
    request:
      requestBody === undefined || !isImmutable
        ? undefined
        : (data: List<Record<T>>) => data.toJS() as T[],

    response:
      Factory === undefined || !isImmutable
        ? undefined
        : (data: T[]) => List(data).map(Factory)
  };
}
