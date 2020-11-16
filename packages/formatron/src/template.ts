import {DataType} from './dataType';
import {Formatron} from './formatron';
import {JsonData, JsonDataComputation, JsonDataRelation} from './types';

// TODO Update this type
export interface ModelTemplate {
  id: number;
  alias: string;
  fields: {
    buildFrom: [];
    computations: JsonDataComputation[];
    fields: JsonData[];
    groupType: string;
    listItemTemplates: JsonData[];
    relations: JsonDataRelation[];
    views: any;
  };
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  name: string;
  securableId: number;
}
export type ModelTemplateFieldKeys = Extract<
  keyof ModelTemplate['fields'],
  'fields' | 'computations' | 'listItemTemplates' | 'relations'
>;

export class Template {
  #formatron: Formatron;

  #template: ModelTemplate;

  constructor(formatron: Formatron, template: ModelTemplate) {
    this.#formatron = formatron;
    this.#template = template;
  }

  get id() {
    return this.#template.id;
  }

  get name() {
    return this.#template.name;
  }

  get alias() {
    return this.#template.alias;
  }

  get lastUpdatedBy() {
    return this.#template.lastUpdatedBy;
  }

  get lastUpdatedDate() {
    return this.#template.lastUpdatedDate;
  }

  get securableId() {
    return this.#template.securableId;
  }

  /**
   * Retrieves the dataType for a specific field.
   * @param fieldName - Name of a field or computation.
   */
  getDataType = <D extends DataType>(fieldName: string): D | undefined => {
    const {fields, computations} = this.#template.fields;
    const combined = [...fields, ...computations];
    const field = combined.find(({name}) => name === fieldName);
    if (!field) {
      console.warn(`No field found with name "${fieldName}`);
      return undefined;
    }
    const MaybeDataType = this.#formatron.getDataType(field.type);
    if (!MaybeDataType) {
      console.warn(`No dataType found with name "${field.type}"`);
      return undefined;
    }
    return new (MaybeDataType as any)(this.#formatron, field) as D;
  };
}
