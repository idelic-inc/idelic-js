import {formatCurrency} from 'src/utils/functions';

import {DataType} from '../dataType';

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

  get numberType(): string {
    return this.field.options?.numberType;
  }
}
