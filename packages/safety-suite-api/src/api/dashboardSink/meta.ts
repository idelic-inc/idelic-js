import {Request} from '@idelic/safety-net';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';
import {DatasetMetaQuery, DatasetMetaResponse} from './types';

export const getDatasetMeta = (
  query: DatasetMetaQuery,
  apiOptions: ApiOptions = {}
): Request<DatasetMetaResponse> =>
  runApi({
    method: 'GET',
    urlRoot: 'dashboardSinkUrlRoot',
    route: '/api/dashboard/discover',
    apiOptions,
    requestOptions: {
      query
    }
  });
