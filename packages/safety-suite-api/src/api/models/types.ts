import {Alias, CreatedBy, Id, LastUpdatedBy} from '../../types';

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

export interface Model<F, R, C> extends LastUpdatedBy, CreatedBy {
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
  createdByUser?: ModelUser;
  lastUpdatedDate: string;
  lastUpdatedByUser?: ModelUser;
}

export type SearchText = {
  /**
   * Field or computation name.
   */
  field: string;
  /**
   * Value that will be partially matched.
   */
  value: string;
};

export type ModelFilterOptions = {
  /**
   * Will return models that have one of the following `id`s.
   */
  ids?: Id[];
  /**
   * Will return models that are of any of the following templates.
   */
  templateIds?: Id[];
  /**
   * Will return models that are of any of the following templates.
   */
  templateAliases?: Alias[];
  /**
   * Will return models that have one of the following `groupId`s.
   */
  groupIds?: Id[];
  /**
   * Will return models that match any of the key value pairs in this array.
   */
  textSearch?: SearchText[];
  /**
   * Key value map. Keys are field / computation names,
   * values are matched strictly.
   */
  jsValueSearch?: Record<string, any>;
  /**
   * Key value map. Keys are protected field names,
   * values are matched strictly.
   */
  protectedValueSearch?: Record<string, any>;
};

export interface RecomputeModelOptions extends ModelFilterOptions {
  /**
   * Array of computation names which should be recomputed.
   * @defaultvalue All computation names.
   */
  computationNames?: string[];
}

export type ByGroup = {
  type: 'byGroup';
  fieldName: string;
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
   * Omits any models before this index.
   */
  start?: number;
};

/**
 * Type of related models to return.
 */
export enum RelationModels {
  /**
   * Will return all types of related models.
   */
  all = 'all',
  /**
   * Will return all child relations as models.
   */
  children = 'children',
  /**
   * Will return only models with a multiModel relation.
   */
  multiModel = 'multiModel',
  /**
   * Will return only models with a singleModel relation.
   */
  singleModel = 'singleModel'
}
export type RelationModelsLiteral =
  | 'all'
  | 'children'
  | 'multiModel'
  | 'singleModel';

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
   *
   * Depth is set by `relationsLevel`.
   */
  relationModels?: RelationModels | RelationModelsLiteral;
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
   * Array of names of computations with `computeOn === 'read'` to compute, others will be skipped.
   */
  restrictReadComputations?: string[];
  /**
   * Will force computation of all computations with `computeOn === 'read'`.
   */
  updateReadComputations?: boolean;
  /**
   * Will include `createdByUser` and `lastUpdatedByUser` in returned models.
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
  /**
   * Used to match group ids.
   *
   * Only `OperationType.contains` is supported here.
   *
   * Example:
   * ```ts
   * operation: {type: OperationType.contains},
   * queryPath: {
   *   pathType: QueryPathType.group,
   *   path: ['id']
   * },
   * queryValue: {value: [1]} // Array of group ids
   * ```
   */
  group = 'GROUP',
  /**
   * Used to match template ids. (Aliases not supported)
   *
   * Only `OperationType.contains` is supported here.
   *
   * Example:
   * ```ts
   * operation: {type: OperationType.contains},
   * queryPath: {
   *   pathType: QueryPathType.template,
   *   path: ['id']
   * },
   * queryValue: {value: [1]} // Array of template ids
   * ```
   */
  template = 'TEMPLATE',
  /**
   * Used to match model ids.
   *
   * Example:
   * ```ts
   * operation: {type: OperationType.equals},
   * queryPath: {
   *   pathType: QueryPathType.id,
   *   path: ['id']
   * },
   * queryValue: {value: '1'} // Model id converted to a string
   * ```
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
   * Used to match name of `createdBy` or `lastUpdatedBy` users.
   *
   * Only `OperationType.contains` is supported here.
   *
   * Example:
   * ```ts
   * operation: {type: OperationType.contains},
   * queryPath: {
   *   pathType: QueryPathType.userName,
   *   path: ['createdBy']
   * },
   * queryValue: {value: 'Idelic User'} // Name of user to partial match
   * ```
   */
  userName = 'USER_NAME',
  /**
   * Used to match the integration source.
   *
   * Only `OperationType.contains` is supported here.
   *
   * Example:
   * ```ts
   * operation: {type: OperationType.contains},
   * queryPath: {
   *   pathType: QueryPathType.source,
   *   path: ['key']
   * },
   * queryValue: {value: 'luma:luma_id'} // Key of a source to exact match
   * ```
   */
  source = 'SOURCE'
}
export type QueryPathTypeLiteral =
  | 'GROUP'
  | 'ID'
  | 'PATH'
  | 'RELATION_PATH'
  | 'RELATION'
  | 'SOURCE'
  | 'TEMPLATE'
  | 'USER_NAME';

/**
 * Determines how the `conditions` will applied.
 */
export enum QueryNodeOperation {
  /**
   * Will return models that match all of the `conditions`.
   */
  and = 'AND',
  /**
   * Will ignore any `conditions`.
   */
  empty = 'EMPTY',
  /**
   * Will return models that match any of the `conditions`.
   */
  or = 'OR'
}
export type QueryNodeOperationLiteral = 'AND' | 'EMPTY' | 'OR';

/**
 * Determines how `queryValue.value` will be evaluated.
 */
export enum OperationType {
  /**
   * Used for array includes or partial match,
   * depending on the `OperationOption` used.
   * Not compatible with `QueryPathType.relation`
   */
  contains = 'CONTAINS',
  /**
   * Used to compare dates. Only compatible with:
   * - `QueryPathType.path`
   */
  dateComparison = 'DATE_COMPARISON',
  /**
   * Used to match a date within a range. Only compatible with:
   * - `QueryPathType.path`
   */
  dayOfYearInRange = 'DAY_OF_YEAR_IN_RANGE',
  /**
   * Used for strict equals match. Only compatible with:
   * - `QueryPathType.path`
   * - `QueryPathType.relation`
   * - `QueryPathType.id`
   */
  equals = 'EQUALS',
  /**
   * Only compatible with:
   * - `QueryPathType.path`
   */
  greaterThan = 'GREATER_THAN',
  /**
   * Only compatible with:
   * - `QueryPathType.path`
   */
  greaterThanEqual = 'GREATER_THAN_EQUAL',
  /**
   * Only compatible with:
   * - `QueryPathType.path`
   * - `QueryPathType.relationPath`
   */
  hasValue = 'HAS_VALUE',
  /**
   * Matches a number value within a given range. Only compatible with:
   * - `QueryPathType.path`
   * - `QueryPathType.relationPath`
   */
  inRange = 'IN_RANGE',
  /**
   * Only compatible with:
   * - `QueryPathType.path`
   */
  isDistinctFrom = 'IS_DISTINCT_FROM',
  /**
   * Only compatible with:
   * - `QueryPathType.path`
   */
  lessThan = 'LESS_THAN',
  /**
   * Only compatible with:
   * - `QueryPathType.path`
   */
  lessThanEqual = 'LESS_THAN_EQUAL',
  /**
   * Only compatible with:
   * - `QueryPathType.path`
   * - `QueryPathType.relationPath`
   */
  notEquals = 'NOT_EQUALS'
}
export type OperationTypeLiteral =
  | 'CONTAINS'
  | 'DATE_COMPARISON'
  | 'DAY_OF_YEAR_IN_RANGE'
  | 'EQUALS'
  | 'GREATER_THAN_EQUAL'
  | 'GREATER_THAN'
  | 'HAS_VALUE'
  | 'IN_RANGE'
  | 'IS_DISTINCT_FROM'
  | 'LESS_THAN_EQUAL'
  | 'LESS_THAN'
  | 'NOT_EQUALS';

export enum OperationOption {
  all = 'ALL',
  any = 'ANY',
  defaultOption = 'DEFAULT_OPTION',
  startsWith = 'STARTS_WITH'
}
export type OperationOptionLiteral =
  | 'ALL'
  | 'ANY'
  | 'DEFAULT_OPTION'
  | 'STARTS_WITH';

export enum AggregateFunction {
  arrayAgg = 'ARRAY_AGG',
  avg = 'AVG',
  count = 'COUNT',
  max = 'MAX',
  min = 'MIN',
  sum = 'SUM'
}
export type AggregateFunctionLiteral =
  | 'ARRAY_AGG'
  | 'AVG'
  | 'COUNT'
  | 'MAX'
  | 'MIN'
  | 'SUM';

export enum DisplayType {
  reportDisplayTypeBarGraph = 'REPORT_DISPLAY_TYPE_BAR_GRAPH',
  reportDisplayTypeLineGraph = 'REPORT_DISPLAY_TYPE_LINE_GRAPH',
  reportDisplayTypeOther = 'REPORT_DISPLAY_TYPE_OTHER',
  reportDisplayTypeTable = 'REPORT_DISPLAY_TYPE_TABLE'
}
export type DisplayTypeLiteral =
  | 'REPORT_DISPLAY_TYPE_BAR_GRAPH'
  | 'REPORT_DISPLAY_TYPE_LINE_GRAPH'
  | 'REPORT_DISPLAY_TYPE_OTHER'
  | 'REPORT_DISPLAY_TYPE_TABLE';

export enum GroupingType {
  date = 'DATE',
  enum = 'ENUM',
  modelGroup = 'MODEL_GROUP',
  relation = 'RELATION',
  value = 'VALUE',
  valuePresence = 'VALUE_PRESENCE'
}
export type GroupingTypeLiteral =
  | 'DATE'
  | 'ENUM'
  | 'MODEL_GROUP'
  | 'RELATION'
  | 'VALUE'
  | 'VALUE_PRESENCE';

export interface QueryConditionOperation {
  type: OperationType | OperationTypeLiteral;
  option?: OperationOption | OperationOptionLiteral;
}
export interface QueryPath {
  pathType: QueryPathType | QueryPathTypeLiteral;
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
  groupingType: GroupingType | GroupingTypeLiteral;
  groupingValue: GroupingValue;
}
export interface AggregationQuery {
  /**
   * @defaultvalue AggregateFunction.arrayAgg
   */
  func?: AggregateFunction | AggregateFunctionLiteral | null;
  aggregateField?: string | null;
  groupBy?: Grouping | null;
  displayType?: DisplayType | DisplayTypeLiteral | null;
}

export interface RangeValue {
  min?: number;
  max?: number;
}
export interface DateRange {
  min: number;
  max: number;
}
export enum ComparisonType {
  before = 'BEFORE',
  after = 'AFTER'
}
export type ComparisonTypeLiteral = 'BEFORE' | 'AFTER';
export enum ComparisonDateType {
  day = 'DAY',
  year = 'YEAR'
}
export type ComparisonDateTypeLiteral = 'DAY' | 'YEAR';
export interface DateComparison {
  comparisonType: ComparisonType | ComparisonTypeLiteral;
  count: number;
  dateType: ComparisonDateType | ComparisonDateTypeLiteral;
}

/*
  Below is a list of type definitions for valid query conditions.
  A matrix containing all of the valid Path / Operation / Value combinations can be found in Notion:
  https://www.notion.so/idelic/78f3fabf57914f0ba50935144a63e4d1?v=0adba7af48de49dfbdca70bc1b6cef7b
*/

export interface RelationCondition extends QueryCondition {
  operation: {
    type: OperationType.equals | 'EQUALS';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.relation | 'RELATION';
  };
  queryValue: {
    value: number;
  };
}
export interface PathConditionAny extends QueryCondition {
  operation: {
    type:
      | OperationType.equals
      | OperationType.greaterThanEqual
      | OperationType.greaterThan
      | OperationType.isDistinctFrom
      | OperationType.lessThanEqual
      | OperationType.lessThan
      | OperationType.notEquals
      | 'EQUALS'
      | 'GREATER_THAN_EQUAL'
      | 'GREATER_THAN'
      | 'IS_DISTINCT_FROM'
      | 'LESS_THAN_EQUAL'
      | 'LESS_THAN'
      | 'NOT_EQUALS';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.path | 'PATH';
  };
}
export interface RelationPathConditionAny extends QueryCondition {
  operation: {
    type: OperationType.notEquals | 'NOT_EQUALS';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.relationPath | 'RELATION_PATH';
  };
}
export interface BooleanCondition extends QueryCondition {
  operation: {
    type: OperationType.hasValue | 'HAS_VALUE';
  };
  queryPath: QueryPath & {
    pathType:
      | QueryPathType.path
      | QueryPathType.relationPath
      | 'PATH'
      | 'RELATION_PATH';
  };
  queryValue: {
    value: boolean;
  };
}
export interface PathConditionString extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
    option?:
      | OperationOption.startsWith
      | OperationOption.defaultOption
      | 'STARTS_WITH'
      | 'DEFAULT_OPTION';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.path | 'PATH';
  };
  queryValue: {
    value: string;
  };
}
export interface RelationPathConditionString extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
    option?: OperationOption.defaultOption | 'DEFAULT_OPTION';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.relationPath | 'RELATION_PATH';
  };
}
export interface PathConditionStringArray extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
    option: OperationOption.any | OperationOption.all | 'ANY' | 'ALL';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.path | 'PATH';
  };
  queryValue: {
    value: string[];
  };
}
export interface RelationPathConditionStringArray extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
    option: OperationOption.any | OperationOption.all | 'ANY' | 'ALL';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.relationPath | 'RELATION_PATH';
  };
  queryValue: {
    value: string[];
  };
}
export interface RangeValueCondition extends QueryCondition {
  operation: {
    type: OperationType.inRange | 'IN_RANGE';
  };
  queryPath: QueryPath & {
    pathType:
      | QueryPathType.path
      | QueryPathType.relationPath
      | 'PATH'
      | 'RELATION_PATH';
  };
  queryValue: {
    value: RangeValue;
  };
}
export interface DateComparisonCondition extends QueryCondition {
  operation: {
    type: OperationType.dateComparison | 'DATE_COMPARISON';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.path | 'PATH';
  };
  queryValue: {
    value: DateComparison;
  };
}
export interface DateRangeCondition extends QueryCondition {
  operation: {
    type: OperationType.dayOfYearInRange | 'DAY_OF_YEAR_IN_RANGE';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.path | 'PATH';
  };
  queryValue: {
    value: DateRange;
  };
}
export interface GroupOrTemplateCondition extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
  };
  queryPath: QueryPath & {
    pathType:
      | QueryPathType.group
      | QueryPathType.template
      | 'GROUP'
      | 'TEMPLATE';
  };
  queryValue: {
    value: number[];
  };
}
export interface UserNameOrSourceCondition extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
  };
  queryPath: QueryPath & {
    pathType:
      | QueryPathType.userName
      | QueryPathType.source
      | 'USER_NAME'
      | 'SOURCE';
  };
  queryValue: {
    value: string;
  };
}
export interface IdEqualsCondition extends QueryCondition {
  operation: {
    type: OperationType.equals | 'EQUALS';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.id | 'ID';
  };
  queryValue: {
    /**
     * Model id converted to a string
     */
    value: string;
  };
}
export interface IdContainsCondition extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.id | 'ID';
  };
  queryValue: {
    value: number[];
  };
}
export interface IdStartsWithCondition extends QueryCondition {
  operation: {
    type: OperationType.contains | 'CONTAINS';
    option: OperationOption.startsWith | 'STARTS_WITH';
  };
  queryPath: QueryPath & {
    pathType: QueryPathType.id | 'ID';
  };
  queryValue: {
    value: string;
  };
}

export type ValidQueryCondition =
  | RelationCondition
  | PathConditionAny
  | RelationPathConditionAny
  | BooleanCondition
  | PathConditionString
  | RelationPathConditionString
  | PathConditionStringArray
  | RelationPathConditionStringArray
  | RangeValueCondition
  | DateComparisonCondition
  | DateRangeCondition
  | GroupOrTemplateCondition
  | UserNameOrSourceCondition
  | IdEqualsCondition
  | IdContainsCondition
  | IdStartsWithCondition;

export interface QueryNode {
  /**
   * Determines how the `conditions` will applied.
   */
  operation: QueryNodeOperation | QueryNodeOperationLiteral;
  /**
   * List of `ValidQueryCondition`s to use for filtering model ids.
   *
   * Use this matrix for reference: [Path - Operation - Value matrix](https://www.notion.so/idelic/78f3fabf57914f0ba50935144a63e4d1?v=0adba7af48de49dfbdca70bc1b6cef7b)
   */
  conditions: ValidQueryCondition[];
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

export interface ModelQueryParams {
  /**
   * Used when we want to use the read replica database on a request.
   */
  readReplica?: boolean;
  /**
   * Used when we want to include indirectly accessible models
   */
  includeIndirectModels?: boolean;
}

export interface Aggregation<GroupValue = unknown> {
  groupKey: string | null;
  groupIds: number[];
  groupValue?: GroupValue;
}

export type ExportColumn = {
  field: string | string[];
  label: string;
};

export type QueryExportTypes = 'xlsx' | 'csv';

export type QueryExport = {
  query: ModelQuery;
  columns: ExportColumn[];
  options: {
    timezone: string;
  };
};

export type QueryExportJobStatus = 'Processing' | 'Ready' | 'Error';

export type QueryExportJob = {
  id: number;
  status: QueryExportJobStatus;
  progress: number;
  createdDate: string;
  createdBy: number;
  fileName: string;
  errorMessage?: string;
};

export type OshaInput = {
  year: number;
  terminalId: Id;
  averageNumberOfEmployees: number;
  totalHoursWorked: number;
  company: string;
  companyExecutive: string;
  title: string;
  phone: string;
  lostRestrictedDays: LostRestrictedInput[];
};

export type LostRestrictedInput = {
  modelId: Id;
  estimateLostDays: number;
  estimateRestrictedDays: number;
};
