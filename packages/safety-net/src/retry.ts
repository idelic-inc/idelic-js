import {CancellablePromise, Rejector, Resolver} from './promise';
import {request} from './request';
import {createError, createResponse} from './response';
import {Methods, OfflineRequestItem, RequestOptions, Response} from './types';

const offlineRequestQueue: OfflineRequestItem[] = [];

const detectOnlineStatus = (): boolean => {
  try {
    return Boolean(window && window.addEventListener);
  } catch (e) {
    return false;
  }
};

if (detectOnlineStatus()) {
  window.addEventListener('online', () => {
    while (offlineRequestQueue.length > 0) {
      const item = offlineRequestQueue.shift();
      if (item) {
        request(
          item.method,
          item.url,
          item.options,
          item.cancellable,
          item.resolve,
          item.reject
        );
      }
    }
  });
}

export function handleLoadEnd<T, E>(
  xhrRequest: XMLHttpRequest,
  method: string,
  url: string,
  options: RequestOptions<any, any>,
  cancellable: CancellablePromise<Response<any>>,
  resolve: Resolver<any>,
  reject: Rejector
): void {
  if (detectOnlineStatus() && !navigator.onLine) {
    offlineRequestQueue.push({
      method: method as Methods,
      url,
      options,
      cancellable,
      resolve,
      reject
    });
  } else if (xhrRequest.status >= 200 && xhrRequest.status < 400) {
    resolve(createResponse<T>(xhrRequest, options.transformers?.response));
  } else {
    reject(createError<E>(xhrRequest, options.transformers));
  }
}
