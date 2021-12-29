/* eslint-disable @typescript-eslint/no-unsafe-return */
import ky from 'ky';
import { HttpError } from './HttpError';

/**
 * KYクライアント
 */
const ApiClient = ky.extend({
  prefixUrl: process.env.API_BASE_URL,
  throwHttpErrors: false,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    beforeRequest: [],
    afterResponse: [
      async (_request, _options, response: Response) => {
        if (response.ok) {
          return { ...response };
        }
        const result = await response.json();
        throw new HttpError(result);
      },
    ],
  },
});

export default ApiClient;
