import {Alias, Id} from '../../types';

export type SortDirection = 'asc' | 'desc';
export type KpiAggregation =
  | 'SUM'
  | 'COUNT'
  | 'MOST_RECENT'
  | 'MOST_RECENT_SUM'
  | 'SELECT'
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
export type BinOp = 'EQ' | 'NEQ' | 'GT' | 'LT' | 'GTE' | 'LTE' | 'IN';
export interface Sort {
  column?: string;
  direction?: SortDirection;
}

export interface Query {
  customerAlias: Alias;
  groupIds?: number[];
}

export interface TableQuery extends Query {
  sort?: Sort[];
  page?: number;
  size?: number;
  riskScoreBucket?: number[];
}

export interface DashboardBaseFields {
  id: Id;
  employeeLabel: string;
  employeeId: Id;
  customerAlias: Alias;
  recordNumber: number;
  groupId: Id;
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
  normalizationConstant?: number;
  filter?: string;
  groupings?: string[];
}
export interface DashboardBookmarksQuery {
  /**
   * Customer alias.
   */
  customerAlias: Alias;
}
export interface DashboardBookmark {
  /**
   * Database ID of the bookmark.
   */
  id: Id;
  /**
   * The display name of the saved bookmark.
   */
  bookmarkName: string;
  /**
   * KPI filter string.
   */
  filter: string;
  /**
   * Model group IDs to filter the dataset on.
   */
  groupIds: Id[];
  /**
   * Groupings string.
   */
  groupings: string;
  /**
   * Date filter interval.
   */
  interval: string;
  /**
   * ISO date string that represents the oldest data in the chart.
   */
  timeFrameFrom: string;
  /**
   * ISO date string that represents the newest data in the chart.
   */
  timeFrameTo: string;
  /**
   * Which field the time frame applies to.
   */
  timeField: string;
  /**
   * Type of chart that should be rendered.
   */
  chartType: string;
  /**
   * Name of the dataset this bookmark is for.
   */
  datasetName: string;
  /**
   * Order the bookmark should appear in on the dataset card.
   */
  order: number;
  /**
   * Flag to determine if bookmark is custom or standard.
   */
  isCustom: boolean;
  /**
   * ISO date string that represents when a custom bookmark is saved.
   */
  savedDate: string;
}
export type InputDashboardBookmark = Omit<
  DashboardBookmark,
  'order' | 'id' | 'isCustom' | 'savedDate'
>;
export interface GetDashboardBookmarksResponse extends DashboardBookmarksQuery {
  /**
   * Array of bookmarks for a specific dataset.
   */
  dashboardBookmarks: DashboardBookmark[];
}
export interface CreateDashboardBookmarksResponse
  extends DashboardBookmarksQuery {
  /**
   * Newly created dashboard bookmark.
   */
  dashboardBookmark: DashboardBookmark;
}

export interface DatasetMetaQuery {
  /**
   * Dataset names to filter by
   */
  filter: string[];
  /**
   * Dataset attribute and direction to sort by. E.g 'name,asc` or 'name,desc'. Default is sorting by 'name'
   */
  sort: string;
  /**
   * Customer alias.
   */
  customerAlias: Alias;
}
export type AttributeType =
  | 'ENUM'
  | 'TEXT'
  | 'NUMBER'
  | 'DATE'
  | 'TIME'
  | 'BOOLEAN';
export interface AttributeMeta {
  metric: string;
  label?: string;
  alias: string;
  type: AttributeType;
  filterPriority?: number;
  filterable: boolean;
  groupable: boolean;
  aggregations: KpiAggregation[];
  filterOptions: BinOp[];
  relatedDatasetNames?: string[];
  multiModelRelation: boolean;
  relation: boolean;
}

export interface DatasetMeta {
  name: string;
  label: string;
  iconName: string;
  moduleAliases: string[];
  hasDefaultDate: boolean;
  attributes: AttributeMeta[];
}

export interface DatasetMetaResponse {
  customerAlias: Alias;
  datasets: DatasetMeta[];
}
