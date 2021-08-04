import {AggregateFunctionLiteral} from '../models';

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

export interface KpiTimeFrame {
  from: string;
  to: string;
}

export interface KpiTimeQuery {
  field: string;
  frame?: KpiTimeFrame;
  interval?: string;
}
export interface KpiQuery {
  customerAlias: string;
  metric: string;
  aggregation?: AggregateFunctionLiteral;
  time?: KpiTimeQuery;
  filter?: string;
}
