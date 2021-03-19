import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {Api, ApiOptions} from '../../types';
import {Model, ModelOptions, ModelQueryParams} from './types';

/**
 * Returns an array of models based on a set of options.
 *
 * @param modelOptions - Model options object.
 * @param apiOptions - Optional options for runApi.
 */
export function fetchModels<
  Models extends Model<any, any, any> = Model<any, any, any>
>(
  modelOptions: ModelOptions,
  modelQueryParams?: ModelQueryParams,
  apiOptions?: ApiOptions
): Request<Models[]> {
  const {ids, orderBy, textSearch} = modelOptions;
  const baseApi: Api<ModelOptions, Models[]> =
    ids || orderBy || textSearch
      ? {
          method: 'POST',
          route: '/api/models/get',
          requestOptions: {body: modelOptions, query: modelQueryParams}
        }
      : {
          method: 'GET',
          route: '/api/models',
          requestOptions: {query: {...modelOptions, ...modelQueryParams}}
        };
  return runApi({...baseApi, apiOptions});
}

/**
 * `updateModels` is used to bulk update multiple models in one request.
 *
 * @param ids - Array of model ids to update.
 * @param fields - An object containing shared fields to be updated.
 * @param apiOptions - Optional options for runApi.
 */
export function updateModels<CommonFields, ModelType = Model<any, any, any>>(
  ids: number[],
  fields: CommonFields,
  apiOptions?: ApiOptions
): Request<ModelType[]> {
  return runApi({
    method: 'PUT',
    route: '/api/models/bulk',
    apiOptions,
    requestOptions: {
      body: {
        ids,
        data: {
          fields
        }
      }
    }
  });
}
