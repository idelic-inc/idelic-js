import {DataType} from '../dataType';
import {AnyModel} from '../types';
import {formatCurrency} from '../utils/functions';

export class NumberType extends DataType {
  public static readonly typeName = 'number';

  isOfType(value: unknown): value is number {
    return typeof value === 'number';
  }

  getFormattedValue(value: string | number) {
    const {formatType} = this;

    switch (formatType) {
      case 'currency':
        return formatCurrency(value);
      default:
        return value;
    }
  }

  validate(value: number | null | undefined, model?: AnyModel): string | null {
    const requiredValidation = super.validate(value, model);
    if (requiredValidation) {
      return requiredValidation;
    }
    if (typeof value !== 'number') {
      return null;
    }
    const min: number = this.field.options?.min ?? -Infinity;
    const max: number = this.field.options?.max ?? Infinity;
    if (value < min) {
      return `Value cannot be less than ${min}`;
    }
    if (value > max) {
      return `Value cannot be greater than ${max}`;
    }
    return null;
  }

  get numberType(): string {
    return this.field.options?.numberType;
  }
}
