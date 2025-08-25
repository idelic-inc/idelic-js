import glob from 'glob';
import path from 'path';

import {ModelTemplate} from './types';

const configurations: Record<string, string> = {
  $configuration_employee: 'Employee'
};

const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
const configurationsRegexp = new RegExp(
  Object.keys(configurations)
    .map((v) => v.replace(matchOperatorsRegex, '\\$&'))
    .join('|'),
  'gi'
);

function createTemplate(
  directory: string,
  parsedTemplate: Record<string, unknown>
): ModelTemplate {
  return {
    ...parsedTemplate,
    directory
  } as ModelTemplate;
}

export function readTemplates(templatesPath: string): ModelTemplate[] {
  return glob
    .sync(`${templatesPath}/**/*.json`, {follow: false})
    .filter((file) => file.indexOf('/dev/') < 0)
    .filter((file) => file.indexOf('/dot/dotWatchlist') < 0)
    .filter((file) => file.indexOf('/accidents/') < 0) // use advanced accidents
    .filter((file) => file.indexOf('/default/Employee.json') < 0) // use editable employees
    .map((file) => {
      const fullPath = path.resolve(file);
      const directory = path.dirname(file).slice(templatesPath.length);
      // eslint-disable-next-line
      const templateJson = require(fullPath);
      const parsedTemplate = JSON.parse(
        JSON.stringify(templateJson).replace(
          configurationsRegexp,
          (matched) => configurations[matched]
        )
      );
      return createTemplate(directory, parsedTemplate);
    });
}
