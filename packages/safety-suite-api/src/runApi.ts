import net, {Request, RequestHeaders, RequestOptions} from 'idelic-safety-net';

import {config} from './config';
import ApiError from './error';
import {Api} from './types';

export function runApi<R, T>(api: Api<R, T>): Request<T> {
  if (!config.initialized) {
    throw new Error(
      'Config was not properly initialized. Please call `initializeConfig` first.'
    );
  }

  const options: RequestOptions<R, T> = api.requestOptions
    ? {...api.requestOptions}
    : {};

  options.headers = options.headers || {};
  options.on = options.on || {};

  if (api.apiOptions) {
    if (api.apiOptions.headers) {
      options.headers = mergeHeaders(options.headers, api.apiOptions.headers);
    }

    if (api.apiOptions.on) {
      options.on = {
        ...options.on,
        ...api.apiOptions.on
      };
    }
  }

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
    error: netError => new ApiError(netError),
    ...options.transformers
  };

  const request = net.request<R, T>(
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

function mergeHeaders(
  headers1: RequestHeaders,
  headers2: RequestHeaders
): RequestHeaders {
  if (Array.isArray(headers1) && Array.isArray(headers2)) {
    return headers1.concat(headers2);
  }
  if (Array.isArray(headers1)) {
    return headers1.concat(convertObjectHeadersToArrayHeaders(headers2));
  }
  if (Array.isArray(headers2)) {
    return convertObjectHeadersToArrayHeaders(headers1).concat(headers2);
  }
  return {
    ...headers1,
    ...headers2
  };
}

function convertObjectHeadersToArrayHeaders(
  headers: Record<string, any>
): [string, any][] {
  return Object.keys(headers).map(key => [key, headers[key]]);
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
