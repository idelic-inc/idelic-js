import { DataType } from '../dataType';

export class TextType extends DataType<string> {
  public static readonly typeName = 'text';

  isOfType(value: unknown): value is string {
    return typeof value === 'string';
  }

  get defaultValue(): string {
    return this.field.options?.defaultValue ?? '';
  }

  get maxLength(): number {
    return this.field.options?.maxLength;
  }
}
