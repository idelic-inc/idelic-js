// How to run.
// Pre Reqs: `tsc` installed and `npm ci` on the repo.
// 1. Compile it with `tsc generateModelTypes.ts --lib es7,dom --esModuleInterop` (add `--watch` if you want).
// 2. Call it with node and no other args.
// 3. Let it complain that you didn't pass any args and follow the output instructions.

import {generateModelTypes} from './parse';
import {readTemplates} from './read';
import {ModelTemplate, ModelType} from './types';
import {anyTypeCounter, writeModelTypes} from './write';

function run(): void {
  const [, file, templatesPath, outputFile]: string[] = process.argv;
  if (process.argv.length < 4 || !templatesPath || !outputFile) {
    console.error(
      `Usage: ${outputFile} ${file} ./path/to/schema/json ./outFile.ts`
    );
    console.error(
      `  Eg: ${outputFile} ${file} ../../safety-suite/backend/conf/schema/json/templates ./modelTypes.ts`
    );
    process.exit(-1);
  }

  const templates: ModelTemplate[] = readTemplates(templatesPath);
  const modelTypes: ModelType[] = generateModelTypes(templates);
  writeModelTypes(outputFile, modelTypes);

  if (anyTypeCounter > 0) {
    console.warn(`Generated ${anyTypeCounter} 'any' types.`);
  }
}

run();
