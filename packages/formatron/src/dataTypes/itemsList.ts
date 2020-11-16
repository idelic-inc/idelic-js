import {DataType} from '../dataType';

export class ItemsListType extends DataType<any[]> {
  public static readonly typeName = 'itemsList';

  isOfType(value: unknown): value is any[] {
    return Array.isArray(value);
  }

  get listTemplateId(): number {
    return this.field.options?.listItemTemplateId;
  }
}
