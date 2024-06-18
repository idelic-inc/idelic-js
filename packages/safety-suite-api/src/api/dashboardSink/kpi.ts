import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {KpiRequestBody, Query} from './types';

export interface KpiGroup {
  name: string;
  fields: string[];
  values: [string | number | boolean | null];
  label: string;
}

export interface KpiMetadata {
  groups: KpiGroup[];
  groupings: string[];
}

export type KpiData = [string | null, number];
export interface KpiResponse {
  meta: KpiMetadata;
  data: Record<string, KpiData[]>;
}

export function getKpi(
  kpi: string,
  query: Query,
  body: KpiRequestBody,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<KpiResponse>> {
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
