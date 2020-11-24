import type {Formatron} from './formatron';
import {EnumType} from './types';

export class Enum {
  #formatron: Formatron;

  #enum: EnumType;

  constructor(formatron: Formatron, rawEnum: EnumType) {
    this.#formatron = formatron;
    this.#enum = rawEnum;
  }

  get alias() {
    return this.#enum.alias;
  }

  get id() {
    return this.#enum.id;
  }

  get display() {
    return this.#enum.display;
  }

  getDisplay(alias: string) {
    return this.#enum.values.find((value) => alias === value.alias)?.display;
  }

  get values() {
    return this.#enum.values;
  }
}
