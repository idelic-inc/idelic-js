import {Alias, Id} from '../../types';

export interface ModelUser {
  id: Id;
  email: string;
  firstName: string;
  lastName: string;
}

export type RelationModelToId<R, T = number> = R extends any[] ? number[] : T;

export type RelationModelsToIds<R> = {
  [N in keyof R]: undefined extends R[N]
    ? RelationModelToId<Exclude<R[N], undefined>, number | null> | undefined
    : RelationModelToId<R[N]>;
};

export interface InputModel<F, R> {
  templateId: Id;
  groupId: Id;
  sourceIds: Record<string, string>;
  prototypeId?: Id;
  fields: F;
  relations?: RelationModelsToIds<R>;
  relationModels?: R;
}

export interface Model<F, R, C> {
  id: Id;
  templateId: Id;
  groupId: Id;
  sourceIds: Record<string, string>;
  prototypeId?: Id;
  fields: F;
  relations?: RelationModelsToIds<R>;
  relationModels?: R;
  computations: C;
  profilePictureUrl?: string;
  createdDate: string;
  createdBy: string;
  createdByUser?: ModelUser;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  lastUpdatedByUser?: ModelUser;
}

export type SearchText = {
  field: string;
  value: string;
};

export type ModelFilterOptions = {
  ids?: Id[];
  templateIds?: Id[];
  templateAliases?: Alias[];
  groupIds?: Id[];
  textSearch?: SearchText[];
  jsValueSearch?: any;
  protectedValueSearch?: any;
};

export type ByGroup = {
  type: 'byGroup';
};

export type ById = {
  type: 'byId';
};

export type ByIdsInFilter = {
  /**
   * Using `byIdsInFilter` will return models relative to
   * the order of the ids in the request body.
   *
   * Using the `ASC` direction will return them in
   * the same order, while `DESC` will reverse them.
   */
  type: 'byIdsInFilter';
};

export type ByTemplate = {
  type: 'byTemplate';
};

export type ByCreatedBy = {
  /**
   * Using `byCreatedBy` will return models sorted by
   * the full name of the user who created the model.
   */
  type: 'byCreatedBy';
};

export type ByRelation = {
  type: 'byRelation';
  name: string;
  isParent: boolean;
  field?: string;
};

export type ByField = {
  type: 'byField';
  name: string;
};

export type OrderBy = {
  direction: 'ASC' | 'DESC';
  parameter:
    | ByGroup
    | ById
    | ByTemplate
    | ByRelation
    | ByField
    | ByIdsInFilter
    | ByCreatedBy;
};

export type ModelListOptions = {
  /**
   * Maximum number of models to return.
   */
  limit?: number;
  /**
   * Options for sorting the returned models.
   */
  orderBy?: OrderBy;
  /**
   * Index in the array of returned models.
   */
  start?: number;
};

export type ModelOutputOptions = {
  /**
   * Will include `profilePictureUrl` in returned models if present.
   */
  profilePicture?: boolean;
  /**
   * Will include confidential fields in returned models if permitted.
   */
  protectedFields?: boolean;
  /**
   * Will include related models in returned models.
   * `singleModel` will return only models with a singleModel relation.
   * `all` will return all types of relations.
   *
   * Depth is set by `relationsLevel`.
   */
  relationModels?: string;
  relationNames?: string[];
  relationTemplateIds?: Id[];
  /**
   * Depth of related models to retrieve.
   *
   * Example:
   * ```ts
   * // Output model with relationsLevel === 2
   * {
   *   // ...
   *   relationModels: {
   *     accident: {
   *       // ...
   *       relationModels: {
   *         employee: {
   *           // ...
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  relationsLevel?: number;
  /**
   * Array of names of computations with `computeOn === 'read'` to skip computation.
   */
  restrictReadComputations?: string[];
  /**
   * Array of names of computations with `computeOn === 'read'` to force computation.
   */
  updateReadComputations?: boolean;
  /**
   * Will include `createdByUser` in returned models.
   */
  users?: boolean;
};

export type ModelOptions = ModelFilterOptions &
  ModelListOptions &
  ModelOutputOptions;

/**
 * Determines how `queryPath` will be used.
 */
export enum QueryPathType {
  /**
   * Used to match relation ids.
   *
   * Example:
   * ```ts
   * operation: {type: OperationType.equals},
   * queryPath: {
   *   pathType: QueryPathType.relation,
   *   path: ['employee']
   * },
   * queryValue: {value: 1} // ID of an Employee model
   * ```
   */
  relation = 'RELATION',
  /**
   * Used to match field or computation values.
   *
   * Example:
   * ```ts
   * queryPath: {
   *   pathType: QueryPathType.path,
   *   path: ['firstName']
   * }
   * ```
   */
  path = 'PATH',
  group = 'GROUP',
  template = 'TEMPLATE',
  /**
   * Used to match model ids.
   */
  id = 'ID',
  /**
   * Used to match fields in relations.
   *
   * Example:
   * ```ts
   * queryPath: {
   *   pathType: QueryPathType.relationPath,
   *   path: ['employee', 'firstName']
   * }
   * ```
   */
  relationPath = 'RELATION_PATH',
  /**
   * Used to match the name of the `createdBy` user.
   */
  userName = 'USER_NAME',
  /**
   * Used to match the integration source.
   */
  source = 'SOURCE'
}
/**
 * Determines how the `conditions` will applied.
 */
export enum QueryNodeOperation {
  /**
   * Will return models that match all of the `conditions`.
   */
  and = 'AND',
  /**
   * Will return models that match any of the `conditions`.
   */
  or = 'OR',
  /**
   * Will ignore any `conditions`.
   */
  empty = 'EMPTY'
}
/**
 * Determines how `queryValue.value` will be evaluated.
 */
export enum OperationType {
  equals = 'EQUALS',
  notEquals = 'NOT_EQUALS',
  isDistinctFrom = 'IS_DISTINCT_FROM',
  lessThan = 'LESS_THAN',
  greaterThan = 'GREATER_THAN',
  lessThanEqual = 'LESS_THAN_EQUAL',
  greaterThanEqual = 'GREATER_THAN_EQUAL',
  hasValue = 'HAS_VALUE',
  inRange = 'IN_RANGE',
  contains = 'CONTAINS',
  dateComparison = 'DATE_COMPARISON',
  dayOfYearInRange = 'DAY_OF_YEAR_IN_RANGE'
}
export enum OperationOption {
  any = 'ANY',
  all = 'ALL',
  defaultOption = 'DEFAULT_OPTION',
  startsWith = 'STARTS_WITH'
}
export enum AggregateFunction {
  arrayAgg = 'ARRAY_AGG',
  count = 'COUNT',
  sum = 'SUM',
  min = 'MIN',
  max = 'MAX',
  avg = 'AVG'
}
export enum DisplayType {
  reportDisplayTypeTable = 'REPORT_DISPLAY_TYPE_TABLE',
  reportDisplayTypeLineGraph = 'REPORT_DISPLAY_TYPE_LINE_GRAPH',
  reportDisplayTypeBarGraph = 'REPORT_DISPLAY_TYPE_BAR_GRAPH',
  reportDisplayTypeOther = 'REPORT_DISPLAY_TYPE_OTHER'
}
export enum GroupingType {
  date = 'DATE',
  value = 'VALUE',
  enum = 'ENUM',
  relation = 'RELATION',
  modelGroup = 'MODEL_GROUP',
  valuePresence = 'VALUE_PRESENCE'
}

export interface QueryConditionOperation {
  type: OperationType;
  option?: OperationOption;
}
export interface QueryPath {
  pathType: QueryPathType;
  path: string[];
}
export interface QueryValue {
  value: any;
}
export interface QueryCondition {
  operation: QueryConditionOperation;
  queryPath: QueryPath;
  queryValue: QueryValue;
}
export interface GroupingValue {
  groupingField: string;
  groupingOption?: any;
  groupingTimezone?: string | null;
}
export interface Grouping {
  groupingType: GroupingType;
  groupingValue: GroupingValue;
}
export interface AggregationQuery {
  /**
   * @defaultvalue AggregateFunction.arrayAgg
   */
  func?: AggregateFunction | null;
  aggregateField?: string | null;
  groupBy?: Grouping | null;
  displayType?: DisplayType | null;
}
export interface QueryNode {
  /**
   * Determines how the `conditions` will applied.
   */
  operation: QueryNodeOperation;
  /**
   * List of `QueryCondition`s to use for filtering model ids.
   */
  conditions: QueryCondition[];
}

export interface ModelQuery {
  /**
   * Options for aggregating the returned model ids.
   */
  aggregation?: AggregationQuery;
  /**
   * Will only return ids of models of this group.
   */
  groupId?: Id;
  /**
   * Maximum number of model ids to return.
   */
  limit?: number;
  /**
   * List of model ids to work with.
   */
  modelsIds?: Id[];
  /**
   * Options for sorting the returned model ids.
   */
  orderBy?: OrderBy;
  /**
   * Will only return ids of models of this template.
   */
  templateAlias?: Alias;
  /**
   * Will only return ids of models of this template.
   */
  templateId?: Id;
  /**
   * Options for filtering the returned model ids.
   */
  where?: QueryNode;
}

export interface Aggregation<GroupValue = unknown> {
  groupKey: string | null;
  groupIds: number[];
  groupValue?: GroupValue;
}
