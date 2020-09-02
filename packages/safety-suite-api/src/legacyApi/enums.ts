import {Alias, Id} from '../types';
import {LegacyApi} from './types';

export type InputEnum = {
  alias: string;
  display: string;
  editable?: boolean;
  fields: any;
};

export type InputEnumValue = {
  alias: Alias;
  disabled: boolean;
  display: string;
  enumId: Id;
  fields: any;
};

export type Enum = {
  alias: string;
  display: string;
  editable?: boolean;
  fields: any;
  id?: Id;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
};

export type EnumValue = {
  alias: Alias;
  disabled: boolean;
  display: string;
  enumId: Id;
  fields: any;
  id?: Id;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
};

export const getEnums: LegacyApi = {
  method: 'GET',
  route: '/api/enums'
};

export const getEnumValues: LegacyApi = {
  method: 'GET',
  route: '/api/enumValues'
};

export function createEnum(inputEnum: InputEnum): LegacyApi {
  const enums: Enum = {
    ...inputEnum,
    id: -1,
    fields: {},
    lastUpdatedBy: '',
    lastUpdatedDate: ''
  };

  return {
    method: 'POST',
    route: '/api/enums',
    requestOptions: {body: enums}
  };
}

export function createEnumValue(inputEnumValue: InputEnumValue): LegacyApi {
  const enumValue: EnumValue = {
    ...inputEnumValue,
    disabled: false,
    fields: {},
    id: -1,
    lastUpdatedBy: '',
    lastUpdatedDate: ''
  };

  return {
    method: 'POST',
    route: '/api/enumValues',
    requestOptions: {body: enumValue}
  };
}

export function updateEnum(enums: Enum): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/enums',
    requestOptions: {body: enums}
  };
}

export function updateEnumValue(enumValue: EnumValue): LegacyApi {
  return {
    method: 'PUT',
    route: '/api/enumValues',
    requestOptions: {body: enumValue}
  };
}
