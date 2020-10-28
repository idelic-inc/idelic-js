export interface BaseDataOptions extends Record<string, any> {
  required: boolean;
}

export interface JsonData {
  name: string;
  type: string;
  label?: string;
  options?: BaseDataOptions;
}

export interface JsonDataRelation extends JsonData {
  options: {
    templatesId: string[];
  } & BaseDataOptions;
}

export interface JsonDataComputation extends JsonData {
  options: {
    resultType?: string;
  } & BaseDataOptions;
}

export interface ModelTemplate {
  alias: string;
  name: string;
  directory: string;
  template: {
    category: string;
    description: string;
    fields: JsonData[];
    computations?: JsonDataComputation[];
    relations: JsonDataRelation[];
    listItemTemplates?: JsonData[];
    views: any; // this script doesn't care about views for now.
  };
}

export interface FieldType {
  name: string;
  present: boolean;
  required: boolean;
  type: string;
  options: {
    multi?: boolean;
    itemType?: string;
  };
}

export interface RelationType {
  name: string;
  required: boolean;
  multi: boolean;
  types: string[];
}

export interface ModelType {
  alias: string;
  name: string;
  directory: string;
  fields: FieldType[];
  computations: FieldType[];
  relations: RelationType[];
}
