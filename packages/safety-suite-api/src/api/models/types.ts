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
  parameter: ByGroup | ById | ByTemplate | ByRelation | ByField | ByIdsInFilter;
};

export type ModelListOptions = {
  limit?: number;
  orderBy?: OrderBy;
  start?: number;
};

export type ModelOutputOptions = {
  profilePicture?: boolean;
  protectedFields?: boolean;
  relationModels?: string;
  relationNames?: string[];
  relationTemplateIds?: Id[];
  relationsLevel?: number;
  restrictReadComputations?: string[];
  updateReadComputations?: boolean;
  users?: boolean;
};

export type ModelOptions = ModelFilterOptions &
  ModelListOptions &
  ModelOutputOptions;
