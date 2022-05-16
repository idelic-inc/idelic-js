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
  | 'eformsUrlRoot'
  | 'dashboardSinkUrlRoot'
  | 'permissionUrlRoot'
  | 'userManagementUrlRoot'
  | 'auditLogUrlRoot'
  | 'claimsSinkUrlRoot'
  | 'claimsSourceUrlRoot'
  | 'etlUriBackendRoot'
  | 'configServiceUrlRoot';

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

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export type LinkName = 'first' | 'prev' | 'self' | 'next' | 'last';
export interface Link {
  href: string;
}

export type Links = {[R in LinkName]?: Link};

export interface ApiSuccessResponse<T> {
  _embedded?: T;
  page?: Page;
  _links?: Links;
}

export interface CustomerSpecificQuery {
  /**
   * Filter restricting the scope of the request to a single SAF
   * instance at a time and allowing to check permissions of a user
   * for a specific customer.
   * Undefined `customerAlias` will result in returning all users across
   * all customers, will only work for super admin.
   */
  customerAlias?: string;
}

export interface LastUpdatedBy {
  /**
   * ID of the user account which last updated this record.
   */
  lastUpdatedBy: number;
}

export interface CreatedBy {
  /**
   * ID of the user account which created this record.
   */
  createdBy: number;
}
