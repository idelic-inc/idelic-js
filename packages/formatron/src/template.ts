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

export class Template<F extends Formatron<any>> {
  #formatron: F;
  #template: ModelTemplate;

  constructor(formatron: F, template: ModelTemplate) {
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
  getDataType = (
    fieldName: string
  ): ReturnType<F['getDataType']> | undefined => {
    const {fields, computations} = this.#template.fields;
    const combined = [...fields, ...computations];
    const {type} = combined.find(({name}) => name === fieldName) ?? {};
    if (!type) {
      console.warn(`No field found with name "${fieldName}`);
      return undefined;
    }
    const item = this.#formatron.getDataType(type);
    if (!item) {
      console.warn(`No dataType found with name "${type}"`);
    }
    return item;
  };
}
