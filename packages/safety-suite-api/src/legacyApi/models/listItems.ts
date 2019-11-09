import {Id} from '../../types';
import {LegacyApi} from '../types';

export type ListItem = any;

export function getModelListItems(modelId: Id, listTemplateId: Id): LegacyApi {
  return {
    method: 'GET',
    route: `/api/models/${modelId}/listItems`,
    requestOptions: {
      query: {listTemplateId}
    }
  };
}

export function updateModelListItems(
  modelId: Id,
  items: ListItem[]
): LegacyApi {
  return {
    method: 'PUT',
    route: `/api/models/${modelId}/listItems`,
    requestOptions: {body: items}
  };
}
