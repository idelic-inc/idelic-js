import { RelatedType } from './related';

export class SingleModelType extends RelatedType {
  public static readonly typeName = 'singleModel';

  /**
   * TODO implement generic to narrow down model type
   * make type guard stricter
   */
  isOfType(value: unknown): value is any {
    return true;
  }

  get isParent(): boolean {
    return this.field.options?.parent ?? false;
  }

  get isMulti(): boolean {
    return this.field.options?.multi ?? false;
  }

  getRelationTemplateById(templateId: number): any {
    if (!this.templateIds.includes(templateId)) {
      throw new Error(
        `Get singleModel template error: template with id: ${templateId} didn't include into options list`
      );
    }

    return this.formatron.getTemplateById(templateId);
  }
}
