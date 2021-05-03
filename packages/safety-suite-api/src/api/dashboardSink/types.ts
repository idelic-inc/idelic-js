export type SortDirection = 'asc' | 'desc';

export interface Sort {
  column: string;
  direction?: SortDirection;
}

export interface Query {
  customerAlias: string;
  groupIds?: string[];
}

export interface TableQuery extends Query {
  sort: Sort[];
  page?: number;
  size?: number;
}

export interface BaseFields {
  id: number;
  employeeLabel: string;
  employeeId: number;
  customerAlias: string;
  groupId: number;
}
