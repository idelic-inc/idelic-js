import {Sort} from './types';

export const convertSortsToStrings = (sorts: Sort[]): string[] => {
  return sorts.map((sort) =>
    sort.direction ? `${sort.column},${sort.direction}` : sort.column
  );
};
