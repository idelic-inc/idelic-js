import {Boolean} from './Boolean';
import {DateTime} from './DateTime';
import {Enum} from './Enum';
import {Number} from './Number';
import {Text} from './Text';

export * from './Boolean';
export * from './DateTime';
export * from './Enum';
export * from './Number';
export * from './Text';

export const fieldComponents = {
  boolean: Boolean,
  dateTime: DateTime,
  enum: Enum,
  number: Number,
  text: Text
};
