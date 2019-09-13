import {Alias} from 'src/baseTypes';

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

export function importData(data: Ixf) {
  return {
    method: 'POST',
    url: '/api/imports',
    options: {body: data}
  };
}

export function importEnums(enums: IxfEnum[]) {
  return {
    method: 'POST',
    url: '/api/imports/enums',
    options: {body: enums}
  };
}

export function importEnumValues(enumValues: IxfEnumValue[]) {
  return {
    method: 'POST',
    url: '/api/imports/enumValues',
    options: {body: enumValues}
  };
}

export function importModelGroups(modelGroups: IxfModelGroup[]) {
  return {
    method: 'POST',
    url: '/api/imports/modelGroups',
    options: {body: modelGroups}
  };
}

export function importModels(models: IxfModel[]) {
  return {
    method: 'POST',
    url: '/api/imports/models',
    options: {body: models}
  };
}

export function importDocuments(documents: IxfDocument[]) {
  return {
    method: 'POST',
    url: '/api/imports/documents',
    options: {body: documents}
  };
}
