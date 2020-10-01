import {
  Events,
  Methods,
  RequestHeaders,
  RequestOptions
} from 'idelic-safety-net';

export type UrlRoot =
  | 'apiUrlRoot'
  | 'loginUrlRoot'
  | 'documentLibraryUrlRoot'
  | 'configUrlRoot';

export interface Api<R, T> {
  method: Methods;
  urlRoot?: UrlRoot;
  route: string;
  notJson?: boolean;
  apiOptions?: ApiOptions;
  requestOptions?: RequestOptions<R, T>;
}

export interface ApiOptions {
  customUrlRoot?: string;
  useImmutable?: boolean;
  headers?: RequestHeaders;
  on?: Events;
}

export type EmptyRequest = undefined;
export type EmptyResponse = {};

export type Alias = string;
export type Id = number;
export type UnixTime = number;

export interface ApiResponse<T> {
  response: T;
}
