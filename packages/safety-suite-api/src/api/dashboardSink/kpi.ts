import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {KpiRequestBody, Query} from './types';

export interface KpiGroup {
  name: string;
  fields: string[];
  values: unknown[];
  humanName: string;
}

export interface KpiMetadata {
  query: any;
  page: number;
  groups: KpiGroup[];
}

export interface KpiResponse<Data = unknown> {
  meta: KpiMetadata;
  data: Record<string, Data[][]>;
}

export function getKpi<Data>(
  kpi: string,
  query: Query,
  body: KpiRequestBody,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<KpiResponse<Data>>> {
  return runApi({
    method: 'POST',
    urlRoot: 'dashboardSinkUrlRoot',
    route: `/api/kpi/${kpi}`,
    apiOptions,
    requestOptions: {
      query,
      body
    }
  });
}
