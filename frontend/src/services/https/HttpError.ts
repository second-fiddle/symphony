import { HttpResponse } from './HttpResponse';

/**
 * HTTPエラークラス
 */
export class HttpError extends Error {
  response: HttpResponse;

  constructor(response) {
    super();
    if (response.data) {
      response.data = JSON.parse(response.data);
    }
    this.response = response;
    this.name = 'HttpError';
  }
}
