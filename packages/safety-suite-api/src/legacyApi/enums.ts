import {EnumSet, EnumValue, InputEnumValue} from '../api/enums';
import {LegacyApi} from './types';

export type InputEnumSet = {
  name: string;
};

/**
 * @deprecated Use `fetchEnumSets` instead.
 */
export const getEnumSets: LegacyApi = {
  method: 'GET',
  route: '/api/enumSet'
};

/**
 * @deprecated Use `fetchEnumValues` instead.
 */
export const getEnumValues: LegacyApi = {
  method: 'GET',
  route: '/api/enum'
};

/**
 * @deprecated
 */
export function createEnumSet(inputEnumSet: InputEnumSet): LegacyApi {
  const enumSet: EnumSet = {
    ...inputEnumSet,
    alias: inputEnumSet.name,
    id: -1,
    fields: {},
    effectiveDate: '',
    lastUpdatedBy: -1
  };

  return {
    method: 'POST',
    route: '/api/enumSet',
    requestOptions: {body: enumSet}
  };
}

/**
 * @deprecated Use `addEnumValue` instead.
 */
export function createEnumValue(inputEnumValue: InputEnumValue): LegacyApi {
  const enumValue: EnumValue = {
    ...inputEnumValue,
    id: -1,
    fields: {},
    effectiveDate: 0,
    lastUpdatedBy: -1,
    disabled: false
  };

  return {
    method: 'POST',
    route: '/api/enum',
    requestOptions: {body: enumValue}
  };
}

/**
 * @deprecated Use `editEnumSet` instead.
 */
export function updateEnumSet(enumSet: EnumSet): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/enumSet',
    requestOptions: {body: enumSet}
  };
}

/**
 * @deprecated Use `editEnumValue` instead.
 */
export function updateEnumValue(enumValue: EnumValue): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/enum',
    requestOptions: {body: enumValue}
  };
}
