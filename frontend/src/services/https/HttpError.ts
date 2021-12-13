import { HttpResponse } from './HttpResponse';

export class HttpError extends Error {
  response: HttpResponse;

  constructor(response) {
    super();
    this.response = response;
    this.name = 'HttpError';
  }
}
