import {InputListItemPrototype, ListItemPrototype} from '../api/listItems';
import {LegacyApi} from './types';

/**
 * @deprecated Use `fetchListItemTemplates` instead.
 */
export const getListItemTemplates: LegacyApi = {
  method: 'GET',
  route: '/api/listItemTemplates'
};

/**
 * @deprecated Use `fetchListItemPrototypes` instead.
 */
export const getListItemPrototypes: LegacyApi = {
  method: 'GET',
  route: '/api/listItemPrototypes'
};

/**
 * @deprecated Use `addListItemPrototype` instead.
 */
export function createListItemPrototype(
  inputPrototype: InputListItemPrototype
): LegacyApi {
  return {
    method: 'POST',
    route: '/api/listItemPrototypes',
    requestOptions: {body: inputPrototype}
  };
}

/**
 * @deprecated Use `editListItemPrototype` instead.
 */
export function updateListItemPrototype(
  prototype: ListItemPrototype
): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/listItemPrototypes',
    requestOptions: {body: prototype}
  };
}

/**
 * @deprecated Use `bulkEditListItemPrototypes` instead.
 */
export function updateListItemPrototypes(
  prototypes: ListItemPrototype[]
): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/listItemPrototypes/many',
    requestOptions: {body: prototypes}
  };
}
