export type SortDirection = 'asc' | 'desc';
export type KpiAggregation =
  | 'SUM'
  | 'COUNT'
  | 'MOST_RECENT'
  | 'MAX'
  | 'MIN'
  | 'AVG'
  | 'ALL'
  | 'ANY';
export type KpiTimeInterval =
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly';
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

export interface KpiTime {
  field?: string;
  frame?: KpiTimeFrame;
  interval?: KpiTimeInterval;
}

export interface KpiNormalization {
  metric: string;
  aggregation: KpiAggregation;
  timeField?: string;
  filter?: string;
}

export interface KpiRequestBody {
  metric: string;
  aggregation: KpiAggregation;
  time?: KpiTime;
  normalization?: KpiNormalization;
  filter?: string;
  groupings?: string[];
}
