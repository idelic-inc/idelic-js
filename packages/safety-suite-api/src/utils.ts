import {fromJS, isKeyed, List, Record} from 'immutable';

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
    return {response: (data: T) => nestedRecordFromJS(Factory, data)};
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
    return {
      response: (data: T[]) =>
        List(data).map(item => nestedRecordFromJS(Factory, item))
    };
  }
  return {};
}

/**
 * To use this nested record parser, default values Record and List<Record>
 * types must look like the below exmaple. This is due to Factory types being
 * determined at runtime based on the default values.
 *
 * ```
 *
 * interface Permission {
 *   value: any;
 * }
 *
 * interface User {
 *   value: any;
 *   singlePermission: Permission,
 *   multiPermissions: Permission[]
 * }
 *
 * interface IUser extends Omit<Omit<User>, 'singlePermission'>, 'multiPermissions'> {
 *   singlePermission: Record<Permission>,
 *   multiPermissions: List<Record<Permission>>
 * }
 *
 * const PermissionRecord = Record<Permission>({
 *   value: ''
 * });
 *
 * const UserRecord = Record<IUser>({
 *   value: '',
 *   singlePermission: UserPermissionRecord(),
 *   multiPermissions: List([UserPermissionRecord()])
 * });
 * ```
 */
function nestedRecordFromJS<T>(Factory: Record.Factory<T>, data: any) {
  return fromJS(data, (key, value, path) => {
    if (!path || path.length === 0) {
      return Factory(value);
    }
    const root = path[0];
    const subPath = path
      .slice(1)
      .map(part => (typeof part === 'number' ? 0 : part));
    const defaultValue = Factory.prototype._defaultValues[root].getIn(subPath);
    if (defaultValue instanceof Record) {
      return Object.getPrototypeOf(defaultValue).constructor(value);
    }
    return isKeyed(value) ? value.toMap() : value.toList();
  });
}
