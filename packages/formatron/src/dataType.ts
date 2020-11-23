import type {Formatron} from './formatron';
import {JsonData} from './types';

export abstract class DataType<T = any> {
  public static readonly typeName: string = '';

  protected field: JsonData;

  protected formatron: Formatron;

  constructor(formatron: Formatron, field: JsonData) {
    this.formatron = formatron;
    this.field = field;
  }

  /**
   * isOfType is an abstract method that acts
   * as a type guard for dataType values
   * @param value - unknown
   */
  abstract isOfType(value: unknown): value is T;

  get isRequired(): boolean {
    const required = this.field.options?.required;
    switch (typeof required) {
      case 'object':
        return false; // TODO Support conditional required
      case 'boolean':
        return required;
      default:
        return false;
    }
  }

  get isProtected(): boolean {
    return (
      (this.field.options?.protected ?? false) ||
      this.field.options?.computeOn === 'decrypt'
    );
  }

  get isOnReport(): boolean {
    return this.field.options?.onReport ?? true;
  }

  get isOnColumn(): boolean {
    return this.field.options?.isOnColumn ?? true;
  }

  get defaultValue(): T | null {
    return this.field.options?.defaultValue ?? null;
  }

  get sortWith(): string | null {
    return this.field.options?.sortWith ?? null;
  }

  get type(): string {
    return this.field.type;
  }

  get label(): string {
    return this.field.label ?? '';
  }

  get name(): string {
    return this.field.name;
  }

  validate(value: T): string | null {
    const {isRequired} = this;
    return isRequired &&
      (value === undefined ||
        value === null ||
        (typeof value === 'string' && !value.trim()))
      ? 'Required field'
      : null;
  }

  get formatType(): string {
    return this.field.options?.formatType ?? '';
  }

  get sideEffects(): Record<string, any> | null {
    return this.field.options?.sideEffect ?? null;
  }
}
