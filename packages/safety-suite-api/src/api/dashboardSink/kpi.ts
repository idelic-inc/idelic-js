import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions, ApiSuccessResponse} from '../../types';
import {KpiQuery} from './types';

export interface KpiGroup {
  name: string;
  fields: string[];
  values: any[];
  humanName: string;
}

export interface KpiMetadata {
  query: any;
  page: number;
  groups: KpiGroup[];
}

export interface KpiResponse {
  meta: KpiMetadata;
  data: Record<string, any[][]>;
}

export function getKpi(
  kpi: string,
  query: KpiQuery,
  apiOptions: ApiOptions = {}
): Request<ApiSuccessResponse<KpiResponse>> {
  return runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: `/api/kpi/${kpi}`,
    apiOptions,
    requestOptions: {
      query
    }
  });
}
