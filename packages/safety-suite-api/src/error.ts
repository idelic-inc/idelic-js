import {NetError} from 'idelic-safety-net';

export default class ApiError extends Error {
  code?: number;

  status: number;

  constructor(netError: NetError<any>) {
    super(ApiError.createErrorMessage(netError));
    this.status = netError.request.status;
    if (netError.response && netError.response.code) {
      this.code = netError.response.code;
    }
  }

  static createErrorMessage(netError: NetError<any>): string {
    if (
      netError.request.status >= 400 &&
      netError.request.status < 600 &&
      netError.response
    ) {
      if (typeof netError.response === 'string') {
        return netError.response;
      }
      if (typeof netError.response.message === 'string') {
        return netError.response.message;
      }
    }
    return netError.message;
  }
}
