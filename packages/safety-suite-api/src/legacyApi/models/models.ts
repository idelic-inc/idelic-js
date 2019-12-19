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
export type ModelListOptions = {
  orderBy?: {
    direction: 'ASC' | 'DESC';
    parameter: {
      type: 'byGroup' | 'byId' | 'byTemplate' | 'byRelation' | 'byField';
      // Required for `type == 'byRelation' | 'byField'`.
      name?: string;
      // Required for `type == 'byRelation'`
      isParent?: boolean;
      // Optional for `type == 'byRelation'`
      field?: string;
    };
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
