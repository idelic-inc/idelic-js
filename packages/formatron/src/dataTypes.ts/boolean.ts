import { DataType } from '../dataType';

export const LABEL_TRUE = 'Yes';
export const LABEL_FALSE = 'No';

export class BooleanType extends DataType<boolean> {
  public static readonly typeName = 'boolean';

  isOfType(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  getFormattedValue(value: boolean): string {
    return value === true ? LABEL_TRUE : LABEL_FALSE;
  }
}
