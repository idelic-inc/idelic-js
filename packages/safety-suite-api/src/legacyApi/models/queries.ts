import {Alias, Id} from '../../types';

export type ModelQuery = {
  where: QueryNode;
  groupId?: Id;
  templateId?: Id;
  templateAlias?: Alias;
  modelsIds?: Id[];
  limit?: number;
  aggregation: AggregationQuery;
};

export type AggregationQuery = any;
export type QueryNode = any;
