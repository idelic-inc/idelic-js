import {Alias, Id} from '../../types';
import {LegacyApi} from '../types';

export type InputModel = any;
export type Model = any;
export type ModelFilterOptions = {
  ids?: Id[];
  templateIds?: Id[];
  templateAliases?: Alias[];
  groupIds?: Id[];
  textSearch?: any;
  jsValueSearch?: any;
  protectedValueSearch?: any;
};
export type ByGroup = {
  type: 'byGroup';
};
export type ById = {
  type: 'byId';
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
  parameter: ByGroup | ById | ByTemplate | ByRelation | ByField;
};
export type ModelListOptions = {
  orderBy?: OrderBy;
  start?: number;
  limit?: number;
};
export type ModelOutputOptions = {
  protectedFields?: boolean;
  updateReadComputations?: boolean;
  relationsLevel?: number;
  relationModels?: string;
  relationNames?: string[];
  relationTemplateIds?: Id[];
  users?: boolean;
};

export function getModelsCount(query: ModelFilterOptions): LegacyApi {
  return {
    method: 'GET',
    route: '/api/models/count',
    requestOptions: {query}
  };
}

export function getModels(
  query: ModelFilterOptions & ModelListOptions & ModelOutputOptions
): LegacyApi {
  if (query.ids || query.orderBy) {
    return {
      method: 'POST',
      route: '/api/models/get',
      requestOptions: {body: query}
    };
  }
  return {
    method: 'GET',
    route: '/api/models',
    requestOptions: {query}
  };
}

export function getModel(modelId: Id, query: ModelOutputOptions): LegacyApi {
  return {
    method: 'GET',
    route: `/api/models/${modelId}`,
    requestOptions: {query}
  };
}

export function createModel(
  body: InputModel,
  query: ModelOutputOptions
): LegacyApi {
  return {
    method: 'POST',
    route: '/api/models',
    requestOptions: {
      body,
      query
    }
  };
}

export function updateModel(body: Model, query: ModelOutputOptions): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/models',
    requestOptions: {
      body,
      query
    }
  };
}

export function deleteModel(modelId: Id): LegacyApi {
  return {
    method: 'DELETE',
    route: `/api/models/${modelId}`
  };
}

export const getModelTemplates: LegacyApi = {
  method: 'GET',
  route: '/api/modelTemplate'
};

export function getHistory(modelId: Id): LegacyApi {
  return {
    method: 'GET',
    route: `/api/model/${modelId}/histories`
  };
}

export function recomputeModels(filterOptions: ModelFilterOptions): LegacyApi {
  return {
    method: 'POST',
    route: '/api/models/recompute',
    requestOptions: {body: filterOptions}
  };
}
