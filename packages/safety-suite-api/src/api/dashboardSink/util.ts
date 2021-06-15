import {Sort} from './types';

export const convertSortsToStrings = (sorts: Sort[]): string[] => {
  return sorts.map((sort) => {
    if (!sort.column) {
      return '';
    }
    return sort.direction ? `${sort.column},${sort.direction}` : sort.column;
  });
};
