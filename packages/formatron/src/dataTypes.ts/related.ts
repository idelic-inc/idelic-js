import {DataType} from '../dataType';

export abstract class RelatedType extends DataType {
  get templateIds(): number[] {
    return (
      this.field.options?.templatesId.filterNot(
        (templateId: number) => templateId === -1
      ) ?? []
    );
  }

  get relatedTo() {
    return this.field.options?.relatedTo;
  }

  get firstRelationTemplate() {
    const [firstId] = this.templateIds ?? [];
    return firstId ? this.formatron.getTemplateById(firstId) : undefined;
  }

  getRelationTemplateById(templateId: number) {
    if (!this.templateIds.includes(templateId)) {
      throw new Error(
        `Template with id "${templateId}" is not included in the options list`
      );
    }

    return this.formatron.getTemplateById(templateId);
  }

  get relationTemplates() {
    const templatesId = this.templateIds;
    return templatesId.flatMap(
      (id) => this.formatron.getTemplateById(id) ?? []
    );
  }

  get relationsModelsPath() {
    return ['relationModels', this.name];
  }
}
