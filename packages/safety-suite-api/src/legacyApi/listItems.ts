import {Alias} from '../types';
import {LegacyApi} from './types';

export type InputListItemPrototype = {
  listItemTemplateAlias: Alias;
  alias: Alias;
  fields: any;
  deletable: boolean;
};

export type ListItemPrototype = any;

export const getListItemTemplates: LegacyApi = {
  method: 'GET',
  route: '/api/listItemTemplates'
};

export const getListItemPrototypes: LegacyApi = {
  method: 'GET',
  route: '/api/listItemPrototypes'
};

export function createListItemPrototype(
  inputPrototype: InputListItemPrototype
): LegacyApi {
  return {
    method: 'POST',
    route: '/api/listItemPrototypes',
    requestOptions: {body: inputPrototype}
  };
}

export function updateListItemPrototype(
  prototype: ListItemPrototype
): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/listItemPrototypes',
    requestOptions: {body: prototype}
  };
}

export function updateListItemPrototypes(
  prototypes: ListItemPrototype[]
): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/listItemPrototypes/many',
    requestOptions: {body: prototypes}
  };
}
