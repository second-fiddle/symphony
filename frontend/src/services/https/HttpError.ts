import { HttpResponse } from './HttpResponse';

/**
 * HTTPエラークラス
 */
export class HttpError extends Error {
  response: HttpResponse;

  constructor(response) {
    super();
    this.response = response;
    this.name = 'HttpError';
  }
}
