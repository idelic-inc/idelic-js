import {NetError} from 'idelic-safety-net';

export type ErrorResponse = {
  status: 'error';
  code: number;
  message: string;
  errors?: any[];
};

export class ApiError extends Error {
  code?: number;

  status: number;

  wasCancelled: boolean;

  constructor(netError: NetError<ErrorResponse>) {
    super(ApiError.createErrorMessage(netError));
    Object.setPrototypeOf(this, ApiError.prototype);
    this.status = netError.request.status;
    if (netError.response) {
      this.code = netError.response.code;
    }
    this.wasCancelled = netError.request.readyState === 0;
  }

  static createErrorMessage(netError: NetError<ErrorResponse>): string {
    if (
      netError.request.status >= 400 &&
      netError.request.status < 600 &&
      netError.response
    ) {
      if (netError.response.message) {
        return netError.response.message;
      }
    }
    return netError.message;
  }
}
