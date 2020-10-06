import { DataType } from '../dataType';

export class ListType extends DataType<any[]> {
  public static readonly typeName = 'list';

  isOfType(value: unknown): value is any[] {
    const itemType: string = this.field.options?.itemType?.type ?? '';
    const itemDataType = this.formatron.getDataType(itemType);
    return Array.isArray(value)
      ? value.every((item) => new itemDataType(this.field).isOfType(item))
      : false;
  }

  get isOnReport(): boolean {
    return false;
  }

  get isOnColumn(): boolean {
    return false;
  }
}
