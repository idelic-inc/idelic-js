import {Request} from '@idelic/safety-net';
import {List, Map, Record as ImRecord} from 'immutable';

import {runApi} from '../../runApi';
import {Alias, ApiOptions, Id, LastUpdated} from '../../types';
import {createRecordListResponseTransformer} from '../../utils';

export interface ModelGroup extends LastUpdated {
  alias: Alias;
  display: string;
  fields: Record<string, unknown>;
  groupType: string;
  id: Id;
  inactive: boolean;
  parentId?: Id;
  securableId: Id;
}

export type ImModelGroup = Omit<ModelGroup, 'fields'> & {
  fields: Map<string, any>;
};

export const ModelGroupRecord = ImRecord<ImModelGroup>({
  id: -1,
  alias: '',
  display: '',
  groupType: '',
  inactive: false,
  parentId: -1,
  securableId: -1,
  lastUpdatedDate: '',
  lastUpdatedBy: -1,
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
