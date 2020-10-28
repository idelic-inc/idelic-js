import {Request} from 'idelic-safety-net';
import {List, Record} from 'immutable';

import {runApi} from '../runApi';
import {Alias, ApiOptions, Id} from '../types';
import {
  createRecordListResponseTransformer,
  createRecordResponseTransformer
} from '../utils';

export type GetCustomersQuery = {
  manageUsers?: boolean;
};

export type CustomerStatus =
  | 'DEV'
  | 'TESTING'
  | 'ONBOARDING'
  | 'LIVE'
  | 'DISABLED';

export interface Customer {
  id: Id;
  alias: Alias;
  name: string;
  endpoint: string;
  frontendUrl: string;
  status: CustomerStatus;
  logoUrl?: string;
}

export const CustomerRecord = Record<Customer>({
  id: -1,
  alias: '',
  name: '',
  endpoint: '',
  frontendUrl: '',
  status: 'DEV',
  logoUrl: ''
});

export function getCustomers(
  query?: GetCustomersQuery,
  apiOptions?: ApiOptions
): Request<Customer[]>;
export function getCustomers(
  query?: GetCustomersQuery,
  apiOptions?: ApiOptions
): Request<List<Record<Customer>>>;
export function getCustomers(
  query: GetCustomersQuery = {},
  apiOptions: ApiOptions = {}
): Request<Customer[] | List<Record<Customer>>> {
  const transformers = createRecordListResponseTransformer<Customer>(
    apiOptions.useImmutable,
    CustomerRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/customers',
    apiOptions,
    requestOptions: {transformers, query}
  });
}

export function getCustomerByAlias(
  alias: Alias,
  apiOptions?: ApiOptions
): Request<Customer>;
export function getCustomerByAlias(
  alias: Alias,
  apiOptions?: ApiOptions
): Request<Record<Customer>>;
export function getCustomerByAlias(
  alias: Alias,
  apiOptions: ApiOptions = {}
): Request<Customer | Record<Customer>> {
  const transformers = createRecordResponseTransformer<Customer>(
    apiOptions.useImmutable,
    CustomerRecord
  );
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/customers/${alias}`,
    apiOptions,
    requestOptions: {transformers}
  });
}
