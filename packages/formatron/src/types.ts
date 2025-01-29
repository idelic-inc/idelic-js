import {ModelTemplate} from './template';

/*
  These types were taken from idelic-safety-suite-api
*/
export type Id = number;
export type Alias = string;

export interface ModelUser {
  id: Id;
  email: string;
  firstName: string;
  lastName: string;
}
export declare type RelationModelToId<R, T = number> = R extends any[]
  ? number[]
  : T;
export declare type RelationModelsToIds<R> = {
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
  relationModels?: Partial<R>;
}
export interface ModelType<F, R, C> {
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
export type AnyModel = ModelType<any, any, any>;
export declare type SearchText = {
  field: string;
  value: string;
};
export declare type ModelFilterOptions = {
  ids?: Id[];
  templateIds?: Id[];
  templateAliases?: Alias[];
  groupIds?: Id[];
  textSearch?: SearchText[];
  jsValueSearch?: any;
  protectedValueSearch?: any;
  hasRelationName?: string;
};
export declare type ByGroup = {
  type: 'byGroup';
};
export declare type ById = {
  type: 'byId';
};
export declare type ByTemplate = {
  type: 'byTemplate';
};
export declare type ByRelation = {
  type: 'byRelation';
  name: string;
  isParent: boolean;
  field?: string;
};
export declare type ByField = {
  type: 'byField';
  name: string;
};
export declare type OrderBy = {
  direction: 'ASC' | 'DESC';
  parameter: ByGroup | ById | ByTemplate | ByRelation | ByField;
};
export declare type ModelListOptions = {
  limit?: number;
  orderBy?: OrderBy;
  start?: number;
};
export declare type ModelOutputOptions = {
  profilePicture?: boolean;
  protectedFields?: boolean;
  relationModels?: string;
  relationNames?: string[];
  relationTemplateIds?: Id[];
  relationsLevel?: number;
  restrictReadComputations?: string[];
  restrictRelatedComputations?: string[];
  updateReadComputations?: boolean;
  users?: boolean;
};
export declare type ModelOptions = ModelFilterOptions &
  ModelListOptions &
  ModelOutputOptions;

export interface RequiredCase {
  pattern: string;
  result: boolean;
}
export type Required =
  | boolean
  | {
      path: string[];
      cases: RequiredCase[];
      default: boolean;
    };
export interface BaseDataOptions extends Record<string, any> {
  required: Required;
}

export interface JsonData {
  name: string;
  type: string;
  label?: string;
  options?: BaseDataOptions;
}
export type FieldPathTuple = [JsonData, string[]];

export interface JsonDataRelation extends JsonData {
  options: {
    templatesId: string[];
  } & BaseDataOptions;
}

export interface JsonDataComputation extends JsonData {
  options: {
    resultType?: string;
  } & BaseDataOptions;
}

export interface FieldType {
  name: string;
  present: boolean;
  required: boolean;
  type: string;
  options: {
    multi?: boolean;
    itemType?: string;
  };
}

export interface RelationType {
  name: string;
  required: boolean;
  multi: boolean;
  types: string[];
}

export interface EnumValueType {
  id: Id;
  alias: Alias;
  display: string;
  disabled: boolean;
  fields: any;
  lastUpdatedBy: string;
}
export interface EnumType {
  id: Id;
  alias: Alias;
  display: string;
  values: EnumValueType[];
  fields: any;
  lastUpdatedBy: string;
}

export interface DataOptions {
  /**
   * Options to be passed to the request.
   */
  options?: any;
}
export interface IdOptions extends DataOptions {
  id: Id;
}
export interface AliasOptions extends DataOptions {
  alias: Alias;
}
export type IdOrAliasOptions = IdOptions | AliasOptions;
export const isIdOptions = (options: IdOrAliasOptions): options is IdOptions =>
  typeof (options as IdOptions).id === 'number';
export const isAliasOptions = (
  options: IdOrAliasOptions
): options is AliasOptions =>
  typeof (options as AliasOptions).alias === 'string';
export interface DataInterface {
  getModelTemplate: (options: IdOrAliasOptions) => Promise<ModelTemplate>;
  getMonitorTemplate: (options: IdOrAliasOptions) => Promise<any>; // TODO fix this type
  getModel: <M extends AnyModel = AnyModel>(options: IdOptions) => Promise<M>;
  getMonitor: (options: IdOrAliasOptions) => Promise<ModelTemplate>;
  getEnum: (options: IdOrAliasOptions) => Promise<EnumType>;
}
