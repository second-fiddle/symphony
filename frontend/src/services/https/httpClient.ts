/* eslint-disable @typescript-eslint/no-unsafe-return */
import ky from 'ky';
import { createErrorResponse, createSuccessResponse } from '.';

/**
 * KYクライアント
 */
export const httpClient = ky.extend({
  prefixUrl: process.env.API_BASE_URL,
  throwHttpErrors: false,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    beforeRequest: [],
    afterResponse: [
      async (_request, _options, response: Response) => {
        const httpResponse = await response.json();
        if (response.ok) {
          return createSuccessResponse(httpResponse);
        }
        throw createErrorResponse(httpResponse);
      },
    ],
  },
});
