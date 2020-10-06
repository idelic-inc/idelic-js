import {RelationModelsToIds} from 'idelic-safety-suite-api';
import type {Formatron} from './formatron';

export interface NewModel<F = any, R = any, C = any> {
  id: number;
  templateId: number;
  fields: F;
  relations: RelationModelsToIds<R>;
  relationModels: R; // Fetch relation model via custom interface
  computations: C; // Possibly fetched via custom interface
}

export type CombinedFields<M extends NewModel> = M['fields'] &
  M['computations'] &
  M['relationModels'];

export type Full<T> = {
  [K in keyof T]-?: Exclude<T[K], null | undefined>;
};

// TODO add form handling:
// changes object = partial model object
// validation map to fields?

export class Model<F extends Formatron<any>, M extends NewModel = NewModel> {
  readonly #model: M;
  #formatron: F;

  /**
   * Model object used to access dataTypes, relations
   * and form state for a model.
   * @param formatron - The formatron client.
   * @param model - JSON model data.
   */
  constructor(formatron: F, model: M) {
    this.#model = model;
    this.#formatron = formatron;
  }

  get id() {
    return this.#model.id;
  }

  /**
   * Get the value of a field, computation or a relation id.
   * @param key - string
   */
  getDataType<K extends keyof M['fields'] | keyof M['computations']>(
    key: K
  ): ReturnType<F['getDataType']> {
    return this.template.getDataType(key as string);
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
    const ids = this.#model.relations[first] ?? -1;
    if (ids === -1) {
      return undefined;
    }
    const modelId = typeof ids === 'number' ? ids : ids[second as number];
    const model = await this.#formatron.getModel(modelId);
    if (rest) {
      return await model.getIn(rest);
    }
    return model.get(second);
  }

  /**
   * The template associated with this model.
   */
  get template() {
    const {templateId} = this.#model;
    const template = this.#formatron.getTemplateById(templateId);
    if (!template) {
      throw new Error(`No template found with id ${templateId}`);
    }
    return template;
  }
}
