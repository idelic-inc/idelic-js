import {DataType} from './dataType';
import type {Formatron} from './formatron';
import {AnyModel} from './types';

export type CombinedFields<M extends AnyModel> = M['fields'] &
  M['computations'] &
  M['relationModels'];

export type Full<T> = {
  [K in keyof T]-?: Exclude<T[K], null | undefined>;
};

// TODO add form handling:
// changes object = partial model object
// validation map to fields?

export class Model<M extends AnyModel = AnyModel> {
  readonly #model: M;

  #formatron: Formatron;

  /**
   * Model object used to access dataTypes, relations
   * and form state for a model.
   * @param formatron - The formatron client.
   * @param model - JSON model data.
   */
  constructor(formatron: Formatron, model: M) {
    this.#model = model;
    this.#formatron = formatron;
  }

  get model() {
    return this.#model;
  }

  get id() {
    return this.#model.id;
  }

  get fields() {
    return this.#model.fields;
  }

  get relations() {
    return this.#model.relations;
  }

  /**
   * Get the value of a field, computation or a relation id.
   * @param key - string
   */
  async getDataType<D extends DataType>(
    key: keyof M['fields'] | keyof M['computations']
  ): Promise<D | undefined> {
    const template = await this.getTemplate();
    return template?.getDataType<D>(key as string);
  }

  /**
   * Get the value of a field, computation or a relation id.
   * @param key - string
   */
  get<K extends keyof M['fields']>(key: K): M['fields'][K];
  get<K extends keyof M['computations']>(key: K): M['computations'][K];
  get<K extends keyof M['relations']>(key: K): M['relations'][K];
  get<K extends CombinedFields<M>>(key: K): any {
    return (
      this.#model.fields[key] ??
      this.#model.computations[key] ??
      this.#model.relations?.[key]
    );
  }

  /**
   * Get a relation model or a value within one. (Still a WIP)
   * @param path - string[]
   */
  getIn<
    K1 extends keyof Full<M['relationModels']>,
    K2 extends Full<M['relationModels']>[K1] extends any[]
      ? number
      : keyof CombinedFields<Full<M['relationModels']>[K1]>
  >(
    path: [K1, K2]
  ): Promise<
    | (Full<M['relationModels']>[K1] extends any[]
        ? Model<Full<M['relationModels']>[K1][K2]>
        : Full<CombinedFields<Full<M['relationModels']>[K1]>[K2]>)
    | undefined
  >;
  getIn(path: (string | number)[]): Promise<any>; // TODO Add more type overloads
  async getIn([first, second, ...rest]: (string | number)[]): Promise<any> {
    const ids = this.#model.relations?.[first] ?? -1;
    if (ids === -1) {
      return undefined;
    }
    const modelId = typeof ids === 'number' ? ids : ids[second as number];
    const model = await this.#formatron.getModel({id: modelId});
    if (rest) {
      return model?.getIn(rest);
    }
    return model?.get(second);
  }

  /**
   * Get the template associated with this model.
   */
  getTemplate() {
    const {templateId} = this.#model;
    return this.#formatron.getModelTemplate({id: templateId});
  }
}
