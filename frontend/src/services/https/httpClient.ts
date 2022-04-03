import ky from 'ky';
import {
  getStoredInfo,
  LocalStorageKey,
} from 'services/resources/storages/localStorage';
import { createErrorResponse, createSuccessResponse } from '.';
import { HttpResponse } from './HttpResponse';

/**
 * KYクライアント
 */
export const httpClient = ky.extend({
  throwHttpErrors: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getStoredInfo<string>(LocalStorageKey.Token);
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response: Response): Promise<HttpResponse> => {
        if (response.status === 204 && response.ok) {
          return response;
        }
        const httpResponse = await response.json();
        if (response.ok) {
          return createSuccessResponse(httpResponse);
        }
        throw createErrorResponse(httpResponse);
      },
    ],
  },
});
