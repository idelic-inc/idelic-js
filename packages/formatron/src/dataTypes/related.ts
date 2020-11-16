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

  getFirstRelationTemplate() {
    const [firstId] = this.templateIds ?? [];
    return firstId ? this.formatron.getModelTemplate({id: firstId}) : undefined;
  }

  getRelationTemplateById(templateId: number) {
    if (!this.templateIds.includes(templateId)) {
      throw new Error(
        `Template with id "${templateId}" is not included in the options list`
      );
    }

    return this.formatron.getModelTemplate({id: templateId});
  }

  getRelationTemplates() {
    const templatesId = this.templateIds;
    return Promise.all(
      templatesId.map((id) => this.formatron.getModelTemplate({id}))
    );
  }

  get relationsModelsPath() {
    return ['relationModels', this.name];
  }
}
