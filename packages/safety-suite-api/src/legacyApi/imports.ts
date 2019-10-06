import {Alias} from '../types';
import {LegacyApi} from './types';

export type Ixf = {
  comments: IxfComment[];
  enums: IxfEnum[];
  enumValues: IxfEnumValue[];
  models: IxfModel[];
  modelGroups: IxfModelGroup[];
};

export type IxfSource = {
  id: string;
  name: string;
};

export type IxfComment = {
  comment: {
    date: number; // TODO: Switch to moment.
    text: string;
  };
  source: IxfSource;
};

export type IxfDocument = any;

export type IxfEnum = {
  alias: Alias;
  display: string;
  editable?: boolean;
  fields?: any;
};

export type IxfEnumValue = {
  enumAlias: Alias;
  alias: Alias;
  display: string;
  disabled?: boolean;
  fields?: any;
};

export type IxfModel = {
  source: IxfSource;
  templateAlias: Alias;
  groupAlias: Alias;
  groupModelSource?: IxfSource;
  fields: any;
  relationSources: Record<string, IxfSource[]>;
};

export type IxfModelGroup = {
  alias: Alias;
  parentAlias?: Alias;
  display: string;
  groupType: string;
  fields?: any;
};

export function importData(data: Ixf): LegacyApi {
  return {
    method: 'POST',
    route: '/api/imports',
    requestOptions: {body: data}
  };
}

export function importEnums(enums: IxfEnum[]): LegacyApi {
  return {
    method: 'POST',
    route: '/api/imports/enums',
    requestOptions: {body: enums}
  };
}

export function importEnumValues(enumValues: IxfEnumValue[]): LegacyApi {
  return {
    method: 'POST',
    route: '/api/imports/enumValues',
    requestOptions: {body: enumValues}
  };
}

export function importModelGroups(modelGroups: IxfModelGroup[]): LegacyApi {
  return {
    method: 'POST',
    route: '/api/imports/modelGroups',
    requestOptions: {body: modelGroups}
  };
}

export function importModels(models: IxfModel[]): LegacyApi {
  return {
    method: 'POST',
    route: '/api/imports/models',
    requestOptions: {body: models}
  };
}

export function importDocuments(documents: IxfDocument[]): LegacyApi {
  return {
    method: 'POST',
    route: '/api/imports/documents',
    requestOptions: {body: documents}
  };
}
