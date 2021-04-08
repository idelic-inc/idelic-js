import {Alias, Id, LastUpdatedBy} from '../types';
import {LegacyApi} from './types';

export type InputEnumSet = {
  name: string;
};

export interface EnumSet extends LastUpdatedBy {
  id: Id;
  name: string;
  fields: any;
  effectiveDate: number;
}

export type InputEnumValue = {
  setId: Id;
  name: Alias;
  display: string;
};

export interface EnumValue extends LastUpdatedBy {
  id: Id;
  setId: Id;
  value: number;
  name: Alias;
  display: string;
  fields: any;
  effectiveDate: number;
  disabled: boolean;
}

export const getEnumSets: LegacyApi = {
  method: 'GET',
  route: '/api/enumSet'
};

export const getEnumValues: LegacyApi = {
  method: 'GET',
  route: '/api/enum'
};

export function createEnumSet(inputEnumSet: InputEnumSet): LegacyApi {
  const enumSet: EnumSet = {
    ...inputEnumSet,
    id: -1,
    fields: {},
    effectiveDate: 0,
    lastUpdatedBy: -1
  };

  return {
    method: 'POST',
    route: '/api/enumSet',
    requestOptions: {body: enumSet}
  };
}

export function createEnumValue(inputEnumValue: InputEnumValue): LegacyApi {
  const enumValue: EnumValue = {
    ...inputEnumValue,
    id: -1,
    value: -1,
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

export function updateEnumSet(enumSet: EnumSet): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/enumSet',
    requestOptions: {body: enumSet}
  };
}

export function updateEnumValue(enumValue: EnumValue): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/enum',
    requestOptions: {body: enumValue}
  };
}
