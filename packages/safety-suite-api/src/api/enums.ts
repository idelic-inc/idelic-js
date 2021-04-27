import {Request} from '@idelic/safety-net';

import {runApi} from '../runApi';
import {Alias, ApiOptions, EmptyRequest, Id, LastUpdatedBy} from '../types';

export interface EnumSet extends LastUpdatedBy {
  /**
   * Unique DB identifier.
   */
  id: Id;
  /**
   * Unique alias.
   */
  alias: Alias;
  /**
   * Formatted display name.
   */
  name: string;
  /**
   * Object containing information about the enum.
   */
  fields: any;
  /**
   * Last updated date.
   */
  effectiveDate: string;
  /**
   * If this enum can be updated via the standard API.
   * @defaultvalue true
   */
  editable?: boolean;
  /**
   * If this enum can be updated via the imports API.
   * @defaultvalue true
   */
  importsEditable?: boolean;
}

export interface EnumValue extends LastUpdatedBy {
  /**
   * Unique DB identifier.
   */
  id: Id;
  /**
   * Unique alias.
   */
  name: Alias;
  /**
   * ID of the parent `EnumSet`.
   */
  setId: Id;
  /**
   * Formatted display name.
   */
  display: string;
  /**
   * Object containing information about the value.
   */
  fields: any;
  /**
   * Last updated date.
   */
  effectiveDate: number;
  /**
   * If this value is hidden in the dropdown.
   */
  disabled: boolean;
}

export type InputEnumValue = Pick<EnumValue, 'setId' | 'name' | 'display'>;

/**
 * Fetches all `EnumSet`s of the customer.
 *
 * @param apiOptions Optional options for runApi.
 * @returns All `EnumSet`s of the customer.
 */
export function fetchEnumSets(apiOptions?: ApiOptions): Request<EnumSet[]> {
  return runApi<EmptyRequest, EnumSet[]>({
    method: 'GET',
    route: '/api/enumSet',
    apiOptions
  });
}

/**
 * Fetches all `EnumValue`s of the customer.
 *
 * @param apiOptions Optional options for runApi.
 * @returns All `EnumValue`s of the customer.
 */
export function fetchEnumValues(apiOptions?: ApiOptions): Request<EnumValue[]> {
  return runApi<EmptyRequest, EnumValue[]>({
    method: 'GET',
    route: '/api/enum',
    apiOptions
  });
}

export interface ApiInputEnumValue extends InputEnumValue {
  fields: Record<string, unknown>;
}

/**
 * Creates a new `EnumValue` related to an `EnumSet`.
 *
 * @param inputPrototype `InputEnumValue` object to be created.
 * @param apiOptions Optional options for runApi.
 * @returns The newly created `EnumValue`.
 */
export function addEnumValue(
  inputEnumValue: InputEnumValue,
  apiOptions?: ApiOptions
): Request<EnumValue> {
  const body: ApiInputEnumValue = {
    ...inputEnumValue,
    fields: {}
  };
  return runApi<ApiInputEnumValue, EnumValue>({
    method: 'POST',
    route: '/api/enum',
    requestOptions: {body},
    apiOptions
  });
}

/**
 * Updates an existing `EnumSet`.
 *
 * @param enumValue `EnumSet` object with updated properties.
 * @param apiOptions Optional options for runApi.
 * @returns The number of updated `EnumSet`s. (Will always be 1)
 */
export function editEnumSet(
  enumSet: EnumSet,
  apiOptions?: ApiOptions
): Request<number> {
  return runApi({
    method: 'PUT',
    route: '/api/enumSet',
    requestOptions: {body: enumSet},
    apiOptions
  });
}

/**
 * Updates an existing `EnumValue`.
 *
 * @param enumValue `EnumValue` object with updated properties.
 * @param apiOptions Optional options for runApi.
 * @returns The number of updated `EnumValue`s. (Will always be 1)
 */
export function editEnumValue(
  enumValue: EnumValue,
  apiOptions?: ApiOptions
): Request<number> {
  return runApi({
    method: 'PUT',
    route: '/api/enum',
    requestOptions: {body: enumValue},
    apiOptions
  });
}
