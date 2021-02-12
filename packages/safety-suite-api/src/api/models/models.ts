import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';
import {Model} from './types';

/**
 * `updateModels` is used to bulk update multiple models in one request.
 *
 * @param ids - Array of model ids to update.
 * @param fields - An object containing shared fields to be updated.
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
