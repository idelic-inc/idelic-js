export type SortDirection = 'asc' | 'desc';

export interface Sort {
  column?: string;
  direction?: SortDirection;
}

export interface Query {
  customerAlias: string;
  groupIds?: number[];
}

export interface TableQuery extends Query {
  sort?: Sort[];
  page?: number;
  size?: number;
  riskScoreBucket?: number[];
}

export interface DashboardBaseFields {
  id: number;
  employeeLabel: string;
  employeeId: number;
  customerAlias: string;
  recordNumber: number;
  groupId: number;
}
