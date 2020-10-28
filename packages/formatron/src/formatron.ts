import {Enum, EnumValue} from 'idelic-safety-suite-api';

import {DataType} from './dataType';
import {DefaultDataTypeClasses} from './dataTypes.ts';
import {Model, NewModel} from './model';
import {ModelTemplate, Template} from './template';

export class Formatron<D extends typeof DataType> {
  #models: Record<number, Model<Formatron<D>> | undefined> = {};

  #templates: Record<number, Template<Formatron<D>> | undefined> = {};

  #templateAliasMap: Record<string, number | undefined> = {};

  #enums: Record<number, Enum | undefined> = {};

  #enumAliasMap: Record<string, number | undefined> = {};

  #enumValues: Record<number, EnumValue | undefined> = {};

  #dataTypes: Record<string, D | DefaultDataTypeClasses | undefined> = {};

  #fetchModel: (id: number) => NewModel | Promise<NewModel>;

  constructor(
    templates: ModelTemplate[],
    enums: Enum[],
    enumValues: EnumValue[],
    fetchModel: (id: number) => NewModel | Promise<NewModel>,
    dataTypes: D[] = []
  ) {
    this.#fetchModel = fetchModel;
    templates.forEach((template) => {
      this.#templates[template.id] = new Template(this, template);
      this.#templateAliasMap[template.alias] = template.id;
    });
    enums.forEach((e) => {
      this.#enums[e.id as number] = e;
      this.#enumAliasMap[e.alias] = e.id;
    });
    dataTypes.forEach((dataType) => {
      this.#dataTypes[dataType.typeName] = dataType;
    });
  }

  getEnumById(id: number) {
    return this.#templates[id];
  }

  getEnumByAlias(alias: string) {
    const id = this.#templateAliasMap[alias];
    return id ? this.getTemplateById(id) : undefined;
  }

  getTemplateById(id: number) {
    return this.#templates[id];
  }

  getTemplateByAlias(alias: string) {
    const id = this.#templateAliasMap[alias];
    return id ? this.getTemplateById(id) : undefined;
  }

  parseModel<M extends NewModel>(model: M): Model<Formatron<D>, M> {
    return new Model(this, model);
  }

  getDataType(name: string): D | DefaultDataTypeClasses | undefined {
    return this.#dataTypes[name];
  }

  async getModel(id: number, noCache = false): Promise<Model<Formatron<D>>> {
    const model = this.#models[id];
    if (model && !noCache) {
      return model;
    }
    const maybePromise = this.#fetchModel(id);
    const fetchedModel =
      maybePromise instanceof Promise ? await maybePromise : maybePromise;
    const newModel = this.parseModel(fetchedModel);
    this.#models[id] = newModel;
    return newModel;
  }
}
