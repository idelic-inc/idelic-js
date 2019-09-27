import net, {
  Response,
  Request,
  RequestHeaders,
  RequestOptions
} from 'idelic-safety-net';

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

export function runApi<T>(api: Api, authToken?: string): Promise<Response<T>> {
  return runCancellableApi<T>(api, authToken).on.complete;
}

export function runCancellableApi<T>(api: Api, authToken?: string): Request<T> {
  if (!config.initialized) {
    throw new Error(
      'Config was not properly initialized. Please call `initializeConfig` first.'
    );
  }

  const options = api.options || {};

  const apiString = JSON.stringify(api);
  if (typeof apiBacklog[apiString] !== 'undefined') {
    return apiBacklog[apiString];
  }

  options.headers = options.headers || {};

  if (api.notJson !== true) {
    setHeader(options.headers, 'Content-Type', 'application/json');
  }

  if (api.noToken !== true) {
    authToken = authToken || window.localStorage.getItem('authToken') || '';
    setHeader(options.headers, 'X-Auth-Token', authToken);
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

  error.status === 401 ? config.onAuthError(error) : console.error(error);
}

function setHeader(headers: RequestHeaders, name: string, value: any): void {
  if (Array.isArray(headers)) {
    const header = headers.find(([headerName]) => name == headerName);
    if (header) {
      header[1] = value;
    } else {
      headers.push([name, value]);
    }
  } else {
    headers[name] = value;
  }
}
