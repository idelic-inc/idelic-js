import {Id} from '../../types';
import {LegacyApi} from '../types';

import {
  InputModel,
  Model,
  ModelFilterOptions,
  ModelOptions,
  ModelOutputOptions
} from '../../api';

export function getModelsCount(query: ModelFilterOptions): LegacyApi {
  return {
    method: 'GET',
    route: '/api/models/count',
    requestOptions: {query}
  };
}

export function getModels(query: ModelOptions): LegacyApi {
  if (query.ids || query.orderBy || query.textSearch) {
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

export function createModel<F, R>(
  body: InputModel<F, R>,
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

export function updateModel<F, R, C>(
  body: Model<F, R, C>,
  query: ModelOutputOptions
): LegacyApi {
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
