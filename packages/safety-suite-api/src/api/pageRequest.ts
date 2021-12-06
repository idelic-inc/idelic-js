export interface PageRequest {
  skip: number;
  take: number;
  filters: PageFilters[];
  pageSort: PageSort[];
}

export interface PageFilters {
  filterOperands: PageFilterOperand[];
  booleanOperation?: BooleanOperation;
}

export interface PageFilterOperand {
  field: string;
  predicateOperation: PredicateOperation;
  booleanOperation: BooleanOperation;
  value: string[] | string;
  ignoreCase: boolean;
}

export interface PageSort {
  field: string;
  desc: boolean;
}

export enum BooleanOperation {
  AND = 'AND',
  OR = 'OR'
}

export enum PredicateOperation {
  EQ = 'EQ',
  GTE = 'GTE',
  GT = 'GT',
  LT = 'LT',
  LTE = 'LTE',
  CONTAINS = 'CONTAINS',
  IN = 'IN'
}
