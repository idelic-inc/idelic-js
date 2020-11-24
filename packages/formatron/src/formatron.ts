import {DataType} from './dataType';
import defaultDataTypes, {DefaultDataTypeClasses} from './dataTypes';
import {Enum} from './enum';
import {Model} from './model';
import {Template} from './template';
import {AnyModel, DataInterface, IdOptions, IdOrAliasOptions} from './types';

export interface TemplateCacheItem {
  ids: Record<number, Template | undefined>;
  aliases: Record<string, number | undefined>;
}
export interface TemplateCache {
  models: TemplateCacheItem;
  monitors: TemplateCacheItem;
}

export class Formatron {
  #dataTypes: Record<
    string,
    DefaultDataTypeClasses | typeof DataType | undefined
  > = {};

  #dataInterface: DataInterface;

  constructor(dataInterface: DataInterface, dataTypes: typeof DataType[] = []) {
    this.#dataInterface = dataInterface;
    defaultDataTypes.forEach((dataType) => {
      this.#dataTypes[dataType.typeName] = dataType;
    });
    dataTypes.forEach((dataType) => {
      this.#dataTypes[dataType.typeName] = dataType;
    });
  }

  getDataType<D extends typeof DataType>(name: string): D | undefined {
    return this.#dataTypes[name] as D;
  }

  async getEnum(options: IdOrAliasOptions) {
    const rawEnum = await this.#dataInterface.getEnum(options);
    return new Enum(this, rawEnum);
  }

  async getModelTemplate(options: IdOrAliasOptions) {
    const rawTemplate = await this.#dataInterface.getModelTemplate(options);
    return new Template(this, rawTemplate);
  }

  async getMonitorTemplate(options: IdOrAliasOptions) {
    const rawTemplate = await this.#dataInterface.getMonitorTemplate(options);
    return new Template(this, rawTemplate);
  }

  async getModel<M extends AnyModel = AnyModel>(options: IdOptions) {
    const rawModel = await this.#dataInterface.getModel<M>(options);
    return new Model<M>(this, rawModel);
  }

  // async getMonitor(options: IdOptions) {
  //   const rawMonitor = await this.#dataInterface.getMonitor(options);
  //   return new Monitor(this, rawMonitor);
  // }
}
