import {CancellablePromise, Rejector, Resolver} from './promise';
import {addEventListeners} from './response';
import {handleLoadEnd} from './retry';
import {
  Methods,
  ParsedHeader,
  QueryParams,
  Request,
  RequestHeaders,
  RequestOptions,
  Response
} from './types';

export function createRequest(method: Methods) {
  return function runRequest<R, T, E = any>(
    url: string,
    options?: RequestOptions<R, T, E>
  ): Request<T> {
    return request(method, url, options);
  };
}

export function request<R, T, E = any>(
  method: string,
  url: string,
  options: RequestOptions<R, T, E> = {},
  cancellable?: CancellablePromise<Response<T>>,
  resolve?: Resolver<T>,
  reject?: Rejector
): Request<T> {
  const xhrRequest = new XMLHttpRequest();
  xhrRequest.open(method, parseUrl(url, options.query));

  const headers = parseHeaders(options.headers);
  headers.forEach((header) =>
    xhrRequest.setRequestHeader(header.name, header.value)
  );

  xhrRequest.withCredentials = true;
  xhrRequest.responseType = options.responseType || 'json';

  xhrRequest.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
      const contentType = this.getResponseHeader('Content-Type') || '';
      if (contentType.includes('application/json')) {
        this.responseType = 'json';
      }
    }
  };

  const cancellablePromise =
    cancellable || addEventListeners<T, E>(xhrRequest, options, method, url);

  const body: any =
    options.transformers && options.transformers.request && options.body
      ? options.transformers.request(options.body)
      : options.body;
  xhrRequest.send(parseRequestBody(body, headers));

  // This is a retry request for offline detection.
  if (resolve && reject) {
    xhrRequest.addEventListener('loadend', () => {
      handleLoadEnd(
        xhrRequest,
        method,
        url,
        options,
        cancellablePromise,
        resolve,
        reject
      );
    });
  }

  return {
    request: xhrRequest,
    on: {
      complete: cancellablePromise._promise
    },
    response: cancellablePromise._promise,
    cancel: cancellablePromise.cancel
  };
}

export function parseUrl(url: string, query?: QueryParams): string {
  if (query) {
    const queryString = parseQuery(query);
    if (url.includes('?')) {
      return url.endsWith('&')
        ? `${url}${queryString}`
        : `${url}&${queryString}`;
    }
    return `${url}?${queryString}`;
  }
  return url;
}

export function parseHeaders(headers?: RequestHeaders): ParsedHeader[] {
  if (!headers) {
    return [];
  }
  if (Array.isArray(headers)) {
    return headers.map(([name, value]) => ({
      name: normalizeHeaderName(name),
      value: `${value}`
    }));
  }
  return Object.keys(headers).map((name) => ({
    name: normalizeHeaderName(name),
    value: `${headers[name]}`
  }));
}

export function parseRequestBody(
  body: any,
  headers: ParsedHeader[]
): any | null {
  if (body) {
    const contentType = headers
      .filter((header) => header.name === 'Content-Type')
      .map((header) => header.value)[0];
    if (contentType === 'application/json' && typeof body !== 'string') {
      return JSON.stringify(body);
    }
    return body;
  }
  return null;
}

function parseQuery(query: QueryParams): string {
  if (typeof query === 'string') {
    return query;
  }
  if (Array.isArray(query)) {
    return query.map((pair) => parseQueryOption(pair[0], pair[1])).join('&');
  }
  return Object.keys(query)
    .filter((queryKey) => typeof query[queryKey] !== 'undefined')
    .map((queryKey) => parseQueryOption(queryKey, query[queryKey]))
    .join('&');
}

function parseQueryOption(key: string, value: any): string {
  if (Array.isArray(value)) {
    return value.map((item) => `${key}=${item}`).join('&');
  }
  if (typeof value === 'undefined' || value === null) {
    return key;
  }
  return `${key}=${value}`;
}

function normalizeHeaderName(name: string): string {
  return name
    .split('-')
    .map((namePart) => {
      const lowerName = namePart.toLowerCase();
      return lowerName[0].toUpperCase() + lowerName.slice(1);
    })
    .join('-');
}
