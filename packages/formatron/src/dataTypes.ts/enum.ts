import { DataType } from '../dataType';

export class EnumType extends DataType {
  public static readonly typeName = 'enum';

  isOfType(value: unknown): value is string {
    return typeof value === 'string' ? this.field.name === value : false;
  }

  get isMulti(): boolean {
    return this.field.options?.multi ?? false;
  }

  // TODO Figure out best way to implement:

  // getOption(value: any): Map<string, any> | undefined {
  //   return this.getOptions().find((option) => option.get('value') === value);
  // }

  // getOptions(): List<Map<string, any>> {
  //   return selectListValues(
  //     getStore().getState(),
  //     this.field.getIn(['options', 'enumId'])
  //   );
  // }
}
