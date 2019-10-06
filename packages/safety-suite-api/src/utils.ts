import {List, Record} from 'immutable';

export function createRecordTransformers<R, T>(
  useImmutable: boolean | undefined,
  Factory: Record.Factory<T>
) {
  return {
    ...createRecordRequestTransformer<R>(useImmutable),
    ...createRecordResponseTransformer<T>(useImmutable, Factory)
  };
}

export function createRecordRequestTransformer<R>(
  useImmutable: boolean | undefined
) {
  if (useImmutable) {
    return {request: (data: Record<R>) => data.toJS()};
  }
  return {};
}

export function createRecordResponseTransformer<T>(
  useImmutable: boolean | undefined,
  Factory: Record.Factory<T>
) {
  if (useImmutable) {
    return {response: (data: T) => Factory(data)};
  }
  return {};
}

export function createRecordsListTransformers<R, T>(
  useImmutable: boolean | undefined,
  Factory: Record.Factory<T>
) {
  return {
    ...createRecordListRequestTransformer<R>(useImmutable),
    ...createRecordListResponseTransformer<T>(useImmutable, Factory)
  };
}

export function createRecordListRequestTransformer<R>(
  useImmutable: boolean | undefined
) {
  if (useImmutable) {
    return {request: (data: List<Record<R>>) => data.toJS()};
  }
  return {};
}

export function createRecordListResponseTransformer<T>(
  useImmutable: boolean | undefined,
  Factory: Record.Factory<T>
) {
  if (useImmutable) {
    return {response: (data: T[]) => List(data).map(Factory)};
  }
  return {};
}
