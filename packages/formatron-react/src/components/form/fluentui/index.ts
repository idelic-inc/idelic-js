export * from './Boolean';
export * from './DateTime';
export * from './Text';

import {Boolean} from './Boolean';
import {DateTime} from './DateTime';
import {Text} from './Text';

export const fieldComponents = {
  boolean: Boolean,
  dateTime: DateTime,
  text: Text
};
