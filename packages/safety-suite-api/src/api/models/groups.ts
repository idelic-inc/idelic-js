import {Request} from 'idelic-safety-net';
import {List, Map, Record as ImRecord} from 'immutable';

import {runApi} from '../../runApi';
import {ApiOptions} from '../../types';
import {createRecordListResponseTransformer} from '../../utils';

export interface ModelGroup {
  id: number;
  alias: string;
  display: string;
  groupType: string;
  parentId?: number;
  securableId: number;
  lastUpdatedDate: string;
  lastUpdatedBy: string;
  fields: Record<string, unknown>;
}

export type ImModelGroup = Omit<ModelGroup, 'fields'> & {
  fields: Map<string, any>;
};

export const ModelGroupRecord = ImRecord<ImModelGroup>({
  id: -1,
  alias: '',
  display: '',
  groupType: '',
  parentId: -1,
  securableId: -1,
  lastUpdatedDate: '',
  lastUpdatedBy: '',
  fields: Map<string, any>()
});

export function getModelGroups(apiOptions?: ApiOptions): Request<ModelGroup[]>;
export function getModelGroups(
  apiOptions?: ApiOptions
): Request<List<ImRecord<ImModelGroup>>>;
export function getModelGroups(
  apiOptions: ApiOptions = {}
): Request<ModelGroup[] | List<ImRecord<ImModelGroup>>> {
  const transformers = createRecordListResponseTransformer<ImModelGroup>(
    apiOptions.useImmutable,
    ModelGroupRecord
  );

  return runApi({
    method: 'GET',
    urlRoot: 'apiUrlRoot',
    route: '/api/models/groups',
    apiOptions,
    requestOptions: {transformers}
  });
}
