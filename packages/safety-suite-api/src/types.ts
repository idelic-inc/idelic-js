import {
  Events,
  Methods,
  RequestHeaders,
  RequestOptions
} from 'idelic-safety-net';

export interface Api<R, T> {
  method: Methods;
  urlRoot?: 'apiUrlRoot' | 'loginUrlRoot';
  route: string;
  notJson?: boolean;
  noToken?: boolean;
  apiOptions?: ApiOptions;
  requestOptions?: RequestOptions<R, T>;
}

export interface ApiOptions {
  useImmutable?: boolean;
  headers?: RequestHeaders;
  on?: Events;
}

export type EmptyRequest = undefined;
export type EmptyResponse = {};

export type Alias = string;
export type Id = number;
