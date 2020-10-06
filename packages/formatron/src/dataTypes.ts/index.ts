import {ComputedType} from './computed';
import {DateTimeType} from './dateTime';
import {EnumType} from './enum';
import {ItemsListType} from './itemsList';
import {ListType} from './list';
import {MultiModelType} from './multiModel';
import {NumberType} from './number';
import {SingleModelType} from './singleModel';
import {TextType} from './text';
import {BooleanType} from './boolean';

const dataTypes = [
  ComputedType,
  DateTimeType,
  EnumType,
  ItemsListType,
  ListType,
  MultiModelType,
  NumberType,
  SingleModelType,
  TextType,
  BooleanType
];

export type DefaultDataTypeClasses = typeof dataTypes[number];
export type DefaultDataTypes = [
  ComputedType,
  DateTimeType,
  EnumType,
  ItemsListType,
  ListType,
  MultiModelType,
  NumberType,
  SingleModelType,
  TextType,
  BooleanType
];

export default dataTypes;
