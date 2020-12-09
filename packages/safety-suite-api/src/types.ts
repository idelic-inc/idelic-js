import {
  Events,
  Methods,
  RequestHeaders,
  RequestOptions
} from '@idelic/safety-net';

export type UrlRoot =
  | 'apiUrlRoot'
  | 'loginUrlRoot'
  | 'documentLibraryUrlRoot'
  | 'configUrlRoot'
  | 'eformsUrlRoot';

export interface Api<R, T> {
  method: Methods;
  urlRoot?: UrlRoot;
  route: string;
  notJson?: boolean;
  apiOptions?: ApiOptions;
  requestOptions?: RequestOptions<R, T>;
}

export interface ApiOptions {
  /**
   * Calls the route with a custom URL root.
   */
  customUrlRoot?: string;
  /**
   * Allows runApi to be used with an uninitialized config.
   */
  bypassInitializeCheck?: boolean;
  /**
   * Any transformers defined for the route will
   * return Immutable data when set to true.
   */
  useImmutable?: boolean;
  /**
   * Request headers.
   */
  headers?: RequestHeaders;
  /**
   * Event handlers.
   */
  on?: Events;
}

export type EmptyRequest = never;
export type EmptyResponse = {}; // eslint-disable-line @typescript-eslint/ban-types

export type Alias = string;
export type Id = number;
export type UnixTime = number;

export interface ApiResponse<T> {
  response: T;
}
