import net, {Request, RequestHeaders, RequestOptions} from 'idelic-safety-net';

import {config} from './config';
import ApiError from './error';

export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export interface Api<T> {
  method: HTTPMethod;
  urlRoot?: 'apiUrlRoot' | 'loginUrlRoot';
  route: string;
  notJson?: boolean;
  noToken?: boolean;
  options?: RequestOptions<T>;
}

export function runApi<T>(api: Api<T>): Request<T> {
  if (!config.initialized) {
    throw new Error(
      'Config was not properly initialized. Please call `initializeConfig` first.'
    );
  }

  const options = {...api.options} || {};

  options.headers = options.headers || {};

  if (api.notJson !== true) {
    options.headers = setHeader(
      options.headers,
      'Content-Type',
      'application/json'
    );
  }

  if (api.noToken !== true) {
    const authToken = window.localStorage.getItem('authToken') || '';
    options.headers = setHeader(options.headers, 'X-Auth-Token', authToken);
  }

  options.transformers = {
    ...options.transformers,
    error: netError => new ApiError(netError)
  };

  const request = net.request<T>(
    api.method,
    `${config[api.urlRoot || 'apiUrlRoot']}${api.route}`,
    options
  );
  request.on.complete.catch(catchError);
  return request;
}

function catchError(error: ApiError): void {
  if (!config.initialized) {
    throw new Error(
      'Config was not properly initialized. Please call `initializeConfig` first.'
    );
  }

  if (error.status === 401) {
    config.onAuthError(error);
  }
}

function setHeader(
  headers: RequestHeaders,
  name: string,
  value: any
): RequestHeaders {
  if (Array.isArray(headers)) {
    const headerIndex = headers.findIndex(
      ([headerName]) => name === headerName
    );
    if (headerIndex >= 0) {
      const newHeaders = [...headers];
      newHeaders[headerIndex][1] = value;
      return newHeaders;
    }
    return [...headers, [name, value]];
  }
  return {
    ...headers,
    [name]: value
  };
}
