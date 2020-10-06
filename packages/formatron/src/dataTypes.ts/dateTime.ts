import { DataType } from '../dataType';
import moment from 'moment';
import {
  DATETIME_FORMAT,
  DATETIME_MASK,
  DATE_FORMAT,
  DATE_MASK,
  TIME_FORMAT,
  TIME_MASK,
} from 'src/utils/constants';

const TYPE_DATE = 'date';
const TYPE_DATETIME = 'dateTime';
const TYPE_TIME = 'time';

export class DateTimeType extends DataType {
  public static readonly typeName = 'dateTime';

  isOfType(value: unknown): value is number {
    return typeof value === 'number' ? moment(value).isValid() : false;
  }

  get dateType(): string {
    return this.field.options?.type ?? TYPE_DATETIME;
  }

  get format(): string {
    return this.field.options?.format ?? this.defaultFormat;
  }

  get mask(): string {
    return this.field.options?.mask ?? this.defaultMask;
  }

  get defaultMask(): string {
    switch (this.dateType) {
      case TYPE_TIME:
        return TIME_MASK;
      case TYPE_DATE:
        return DATE_MASK;
      case TYPE_DATETIME:
      default:
        return DATETIME_MASK;
    }
  }

  get defaultFormat(): string {
    switch (this.dateType) {
      case TYPE_TIME:
        return TIME_FORMAT;
      case TYPE_DATE:
        return DATE_FORMAT;
      case TYPE_DATETIME:
      default:
        return DATETIME_FORMAT;
    }
  }
}
