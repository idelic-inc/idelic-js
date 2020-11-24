import {DataType} from '../dataType';

export class EnumType extends DataType {
  public static readonly typeName = 'enum';

  isOfType(value: unknown): value is string {
    return typeof value === 'string' ? this.field.name === value : false;
  }

  get isMulti(): boolean {
    return this.field.options?.multi ?? false;
  }

  get id(): number {
    return this.field.options?.enumSetId;
  }

  // getOptions(): List<Map<string, any>> {
  //   return selectListValues(
  //     getStore().getState(),
  //     this.field.getIn(['options', 'enumId'])
  //   );
  // }
}
