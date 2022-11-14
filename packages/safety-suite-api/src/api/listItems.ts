import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {Alias, ApiOptions, EmptyRequest, Id, LastUpdated} from '../types';

export interface ListItemTemplate extends LastUpdated {
  /**
   * String alias
   */
  alias: Alias;
  /**
   * Unique DB identifier
   */
  id: Id;
  /**
   * Formatted display name
   */
  name: string;
  /**
   * Object containing information about the template
   */
  template: any;
}
export interface ListItemPrototype extends LastUpdated {
  /**
   * String alias
   */
  alias: Alias;
  /**
   * If the prototype can be marked as inactive
   */
  deletable: boolean;
  /**
   * Extra properties of the prototype
   */
  fields: {
    /**
     * Formatted display name
     */
    name: string;
    /**
     * Index of the prototype within the parent template
     */
    sortOrder?: number;
  };
  /**
   * Unique DB identifier
   */
  id: Id;
  /**
   * Inactive or disabled
   */
  inactive: boolean;
  /**
   * ID of the parent `ListItemTemplate`
   */
  listItemTemplateId: Id;
}
export interface InputListItemPrototype
  extends Pick<ListItemPrototype, 'alias' | 'fields' | 'deletable'> {
  /**
   * Alias of the parent `ListItemTemplate`
   */
  listItemTemplateAlias: Alias;
}

/**
 * Fetches all `ListItemTemplate`s of the customer.
 *
 * @param apiOptions Optional options for runApi.
 * @returns All `ListItemTemplate`s of the customer.
 */
export function fetchListItemTemplates(
  apiOptions?: ApiOptions
): Request<ListItemTemplate[]> {
  return runApi<EmptyRequest, ListItemTemplate[]>({
    method: 'GET',
    route: '/api/listItemTemplates',
    apiOptions
  });
}

/**
 * Fetches all `ListItemPrototype`s of the customer.
 *
 * @param apiOptions Optional options for runApi.
 * @returns All `ListItemPrototype`s of the customer.
 */
export function fetchListItemPrototypes(
  apiOptions?: ApiOptions
): Request<ListItemPrototype[]> {
  return runApi<EmptyRequest, ListItemPrototype[]>({
    method: 'GET',
    route: '/api/listItemPrototypes',
    apiOptions
  });
}

/**
 * Creates a new `ListItemPrototype` related to a `ListItemTemplate`.
 *
 * @param inputPrototype `InputListItemPrototype` object to be created.
 * @param apiOptions Optional options for runApi.
 * @returns The newly created `ListItemPrototype`.
 */
export function addListItemPrototype(
  inputPrototype: InputListItemPrototype,
  apiOptions?: ApiOptions
): Request<ListItemPrototype> {
  return runApi<InputListItemPrototype, ListItemPrototype>({
    method: 'POST',
    route: '/api/listItemPrototypes',
    requestOptions: {body: inputPrototype},
    apiOptions
  });
}

/**
 * Updates an existing `ListItemPrototype`.
 *
 * @param prototype `ListItemPrototype` object with updated properties.
 * @param apiOptions Optional options for runApi.
 * @returns The number of updated `ListItemPrototype`s. (Will always be 1)
 */
export function editListItemPrototype(
  prototype: ListItemPrototype,
  apiOptions?: ApiOptions
): Request<number> {
  return runApi<ListItemPrototype, number>({
    method: 'PUT',
    route: '/api/listItemPrototypes',
    requestOptions: {body: prototype},
    apiOptions
  });
}

/**
 * Updates multiple existing `ListItemPrototype`s.
 *
 * @param prototypes Array of `ListItemPrototype` objects with updated properties.
 * @param apiOptions Optional options for runApi.
 * @returns The number of updated `ListItemPrototype`s.
 */
export function bulkEditListItemPrototypes(
  prototypes: ListItemPrototype[],
  apiOptions?: ApiOptions
): Request<number> {
  return runApi<ListItemPrototype[], number>({
    method: 'PUT',
    route: '/api/listItemPrototypes/many',
    requestOptions: {body: prototypes},
    apiOptions
  });
}
