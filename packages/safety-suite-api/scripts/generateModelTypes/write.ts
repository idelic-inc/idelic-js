import fs from 'fs';
import ts, {factory} from 'typescript';

import {FieldType, ModelType, RelationType} from './types';
import {toCamelCase} from './utils';

// Sshhh, don't tell anyone about this global state 👀
export let anyTypeCounter = 0; // eslint-disable-line import/no-mutable-exports

const nameSort = (a: {name: string}, b: {name: string}) =>
  a.name < b.name ? -1 : 1;

const makeNullableMaker = (required: boolean) =>
  required
    ? (node: ts.TypeNode) => node
    : (node: ts.TypeNode) =>
        factory.createUnionTypeNode([
          node,
          factory.createKeywordTypeNode(ts.SyntaxKind.NullKeyword as any)
        ]);

function parseType(type: string, field: FieldType): ts.TypeNode {
  const makeNullable = makeNullableMaker(field.required);
  switch (type) {
    case 'text':
      return factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    case 'dateTime':
    case 'number':
    case 'group':
    case 'interval':
      return makeNullable(
        factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
      );
    case 'boolean':
      return factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    case 'enum': {
      const enumType = factory.createKeywordTypeNode(
        ts.SyntaxKind.StringKeyword
      );
      return field.options.multi
        ? factory.createArrayTypeNode(enumType)
        : makeNullable(enumType);
    }
    case 'list':
      return factory.createArrayTypeNode(
        parseType(field.options.itemType, field)
      );
    default:
  }

  if (type) {
    console.warn(
      `Unknown type '${type}' for field '${field.name}'. Returning 'any'.`
    );
  } else {
    console.warn(`Missing type for field '${field.name}'. Returning 'any'.`);
  }

  anyTypeCounter += 1;
  return factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
}

function parseRelationsType(
  types: string[],
  relation: RelationType,
  nameModifier: string
): ts.TypeNode {
  const makeNullable = makeNullableMaker(relation.required);
  const relationType = factory.createUnionTypeNode(
    types
      .map(toCamelCase)
      .map((name) => `${name}${nameModifier}Model`)
      .map((type) => factory.createTypeReferenceNode(type, undefined))
  );

  return relation.multi
    ? factory.createArrayTypeNode(relationType)
    : makeNullable(relationType);
}

function addMultipleComments(comments, node) {
  return comments.reduce(
    (newNode, comment) =>
      ts.addSyntheticLeadingComment(
        newNode,
        ts.SyntaxKind.SingleLineCommentTrivia,
        comment
      ),
    node
  );
}

const FILE_START: ts.Statement[] = [
  addMultipleComments(
    [
      ' THIS FILE IS GENERATED',
      ' That means that you should never edit it.',
      ' Yes, that means you.',
      ' See `scripts/generateModelTypes/index.ts` for more details.'
    ],
    factory.createImportDeclaration(
      [],
      [],
      factory.createImportClause(
        undefined,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(
            undefined,
            factory.createIdentifier('InputModel')
          ),
          factory.createImportSpecifier(
            undefined,
            factory.createIdentifier('Model')
          )
        ])
      ),
      factory.createStringLiteral('./types')
    )
  )
];

function generateFieldsInterface(
  name: string,
  fields: FieldType[]
): ts.Statement {
  return factory.createInterfaceDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    name,
    undefined,
    undefined,
    fields
      .sort(nameSort)
      .map((field) =>
        factory.createPropertySignature(
          undefined,
          factory.createIdentifier(field.name),
          field.present
            ? undefined
            : factory.createToken(ts.SyntaxKind.QuestionToken),
          parseType(field.type, field)
        )
      )
  );
}

function generateRelationsInterface(
  name: string,
  relations: RelationType[],
  nameModifier = ''
): ts.Statement {
  return factory.createInterfaceDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    name,
    undefined,
    undefined,
    relations
      .sort(nameSort)
      .map((relation) =>
        factory.createPropertySignature(
          undefined,
          factory.createIdentifier(relation.name),
          relation.required
            ? undefined
            : factory.createToken(ts.SyntaxKind.QuestionToken),
          parseRelationsType(relation.types, relation, nameModifier)
        )
      )
  );
}

function generateTypeAlias(
  name: string,
  typeName: string,
  parameters: string[]
): ts.Statement {
  return factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    name + typeName,
    [],
    factory.createTypeReferenceNode(
      typeName,
      parameters.map((parameter) =>
        factory.createTypeReferenceNode(name + parameter, undefined)
      )
    )
  );
}

function generateTypescriptTypes(modelType: ModelType): ts.Statement[] {
  const upperName = toCamelCase(modelType.alias);

  const createEmptyLine = () => {
    // TypeScript's compiler API doesn't care about formatting / newlines, but
    // prettier doesn't always add newlines either... so we hack the compiler
    // API to make it spit out newlines.  An unparsed source file node gets
    // output as is.  However, it doesn't have an emitterNode, which is
    // required for adding comments on to it.  Therefore, let's create one for
    // it!  Nothing could go wrong here, right?
    const emptyLine = ts.createUnparsedSourceFile('\n');
    (emptyLine as any).emitNode = {};
    return emptyLine;
  };

  return [
    createEmptyLine(),
    addMultipleComments(
      [
        ` Type definitions for ${modelType.directory} / ${modelType.name} (${modelType.alias})`
      ],
      createEmptyLine()
    ),
    generateFieldsInterface(`${upperName}Fields`, modelType.fields),
    createEmptyLine(),
    generateRelationsInterface(`${upperName}Relations`, modelType.relations),
    createEmptyLine(),
    generateRelationsInterface(
      `${upperName}InputRelations`,
      modelType.relations,
      'Input'
    ),
    createEmptyLine(),
    generateFieldsInterface(`${upperName}Computations`, modelType.computations),
    createEmptyLine(),
    generateTypeAlias(upperName, 'Model', [
      'Fields',
      'Relations',
      'Computations'
    ]),
    createEmptyLine(),
    generateTypeAlias(upperName, 'InputModel', ['Fields', 'InputRelations'])
  ];
}

export function writeModelTypes(
  outputFile: string,
  modelTypes: ModelType[]
): void {
  const sourceFile = ts.createSourceFile(
    outputFile,
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );
  const printer = ts.createPrinter();

  const typeNodes = modelTypes
    .map((modelType) => generateTypescriptTypes(modelType))
    .reduce((allNodes, nodes) => allNodes.concat(nodes), []);

  // 🤠
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  sourceFile.statements = factory.createNodeArray([
    ...FILE_START,
    ...typeNodes
  ]);

  const fileContent = printer.printFile(sourceFile);

  fs.writeFile(outputFile, fileContent, (err) => {
    if (err) {
      console.error(`Error writing '${outputFile}'.`, err);
    }
  });
}
