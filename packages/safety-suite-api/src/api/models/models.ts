import {Alias, Id} from '../../baseTypes';

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
export type ModelListOptions = {
  orderBy?: {
    type: 'byGroup' | 'byId' | 'byTemplate' | 'byRelation' | 'byField';
    direction: 'ASC' | 'DESC';
    // Required for `type == 'byRelation' | 'byField'`.
    name?: string;
    // Required for `type == 'byRelation'`
    isParent?: boolean;
    // Optional for `type == 'byRelation'`
    field?: string;
  };
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

export function getModelsCount(query: ModelFilterOptions) {
  return {
    method: 'GET',
    route: '/api/models/count',
    options: {query}
  };
}

export function getModels(
  query: ModelFilterOptions & ModelListOptions & ModelOutputOptions
) {
  if (query.ids || query.orderBy) {
    return {
      method: 'POST',
      route: '/api/models/get',
      options: {body: query}
    };
  }
  return {
    method: 'GET',
    route: '/api/models',
    options: {query}
  };
}

export function getModel(modelId: Id, query: ModelOutputOptions) {
  return {
    method: 'GET',
    route: `/api/models/${modelId}`,
    options: {query}
  };
}

export function createModel(body: InputModel, query: ModelOutputOptions) {
  return {
    method: 'POST',
    route: '/api/models',
    options: {
      body,
      query
    }
  };
}

export function updateModel(body: Model, query: ModelOutputOptions) {
  return {
    method: 'PUT',
    route: '/api/models',
    options: {
      body,
      query
    }
  };
}

export function deleteModel(modelId: Id) {
  return {
    method: 'DELETE',
    route: `/api/models/${modelId}`
  };
}

export const getModelTemplates = {
  method: 'GET',
  route: '/api/modelTemplate'
};

export const getModelGroups = {
  method: 'GET',
  route: '/api/models/groups'
};

export function getHistory(modelId: Id) {
  return {
    method: 'GET',
    route: `/api/model/${modelId}/histories`
  };
}

export function recomputeModels(filterOptions: ModelFilterOptions) {
  return {
    method: 'POST',
    route: '/api/models/recompute',
    options: {body: filterOptions}
  };
}
