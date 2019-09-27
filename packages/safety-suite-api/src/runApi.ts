import net, {Request, RequestHeaders, RequestOptions} from 'idelic-safety-net';

import {config} from './config';
import ApiError from './error';

export type HTTPMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

export interface Api {
  method: HTTPMethod;
  urlRoot?: 'apiUrlRoot' | 'loginUrlRoot';
  route: string;
  notJson?: boolean;
  noToken?: boolean;
  options: RequestOptions;
}

const apiBacklog: Record<string, Request<any>> = {};

export function runApi<T>(api: Api, authToken?: string): Request<T> {
  if (!config.initialized) {
    throw new Error(
      'Config was not properly initialized. Please call `initializeConfig` first.'
    );
  }

  const options = {...api.options} || {};

  const apiString = JSON.stringify(api);
  if (typeof apiBacklog[apiString] !== 'undefined') {
    return apiBacklog[apiString];
  }

  options.headers = options.headers || {};

  if (api.notJson !== true) {
    options.headers = setHeader(
      options.headers,
      'Content-Type',
      'application/json'
    );
  }

  if (api.noToken !== true) {
    const XAuthToken =
      authToken || window.localStorage.getItem('authToken') || '';
    options.headers = setHeader(options.headers, 'X-Auth-Token', XAuthToken);
  }

  options.transformers = {
    errors: netError => new ApiError(netError)
  };

  apiBacklog[apiString] = net.request(
    api.method,
    `${config[api.urlRoot || 'apiUrlRoot']}${api.route}`,
    options
  );
  apiBacklog[apiString].on.complete.finally(() => delete apiBacklog[apiString]);
  return apiBacklog[apiString];
}

export function catchError(error: ApiError): void {
  if (!config.initialized) {
    throw new Error(
      'Config was not properly initialized. Please call `initializeConfig` first.'
    );
  }

  if (error.status === 401) {
    config.onAuthError(error);
  } else {
    console.error(error);
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
