import {Request, RequestOptions} from 'idelic-safety-net';
import {List, Record} from 'immutable';

import {Alias, Id} from '../baseTypes';
import {runApi} from '../runApi';
import {createListTransformers, createTransformers} from '../utils';

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
  status: CustomerStatus;
  logoUrl?: string;
}

export const CustomerRecord = Record<Customer>({
  id: -1,
  alias: '',
  name: '',
  status: 'DEV'
});

export function get(options: RequestOptions<Customer[]>): Request<Customer[]>;
export function get(
  options: RequestOptions<List<Record<Customer>>>
): Request<List<Record<Customer>>>;
export function get(options: RequestOptions<any>): Request<any> {
  const transformers = createListTransformers<Customer>(CustomerRecord);
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: '/api/1.0/customers',
    options: {transformers, ...options}
  });
}

export function getByAlias(
  alias: Alias,
  options: RequestOptions<Customer>
): Request<Customer>;
export function getByAlias(
  alias: Alias,
  options: RequestOptions<Record<Customer>>
): Request<Record<Customer>>;
export function getByAlias(
  alias: Alias,
  options: RequestOptions<any> = {}
): Request<any> {
  const transformers = createTransformers<Customer>(CustomerRecord);
  return runApi({
    method: 'GET',
    urlRoot: 'loginUrlRoot',
    route: `/api/1.0/customers/${alias}`,
    options: {transformers, ...options}
  });
}
