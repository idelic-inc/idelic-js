import {
  FieldType,
  JsonData,
  JsonDataComputation,
  ModelTemplate,
  ModelType,
  RelationType
} from './types';

function parseField(field: JsonData): FieldType {
  return {
    name: field.name,
    present: field.options?.required === true,
    required: field.options?.required === true,
    type: field.type,
    options: {
      multi: field.options?.multi,
      itemType: field.options?.itemType?.type
    }
  };
}

function parseComputation(field: JsonDataComputation): FieldType {
  return {
    name: field.name,
    present: true,
    // we have no way of telling if a computation is guaranteed to have a value or not.
    required: false,
    type: field.options?.resultType,
    options: {}
  };
}

function parseRelation(field: JsonData): RelationType {
  const relatedModels = field.options.templatesId.map(
    (alias) => alias.split('$alias_template_')[1]
  );

  const multi = field.type === 'multiModel';
  return {
    name: field.name,
    required: field.options.required === true,
    multi,
    types: relatedModels
  };
}

export function generateModelTypes(templates: ModelTemplate[]): ModelType[] {
  return templates.map((template) => ({
    alias: template.alias,
    name: template.name,
    directory: template.directory,
    fields: template.template.fields.map(parseField),
    computations: template.template.computations?.map(parseComputation) || [],
    relations: template.template.relations.map(parseRelation)
  }));
}
