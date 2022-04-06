import { StatusCodes } from 'http-status-codes';
import ky from 'ky';
import {
  getStoredInfo,
  LocalStorageKey,
} from 'services/resources/storages/localStorage';
import { isEmpty } from 'lodash';
import { createResponse, HttpResponse } from './HttpResponse';

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
        if (response.ok && response.status === StatusCodes.NO_CONTENT) {
          return response;
        }

        const responseJson = await response.json();

        const httpResponse = createResponse(response.ok, responseJson);
        if (!response.ok) {
          throw httpResponse;
        }

        return httpResponse;
      },
    ],
  },
});

const makeGetUrl = (url: string, params): string => {
  if (isEmpty(params)) {
    return url;
  }
  const urlParams = new URLSearchParams(params);

  return url.indexOf('?') >= 0
    ? `${url}&${urlParams.toString()}`
    : `${url}?${urlParams.toString()}`;
};

export class httpService {
  /**
   * getリクエストを送信する
   * @param url URL
   * @param params リクエストパラメーター
   * @param catchCallback 例外時のコールバック
   * @returns HttpResponse
   */
  static get = async (
    url: string,
    params = {},
    catchCallback?: (error) => HttpResponse,
  ): Promise<HttpResponse> => {
    const requestUrl = makeGetUrl(url, params);

    const httpResponse = await httpClient
      .get(requestUrl)
      .json<HttpResponse>()
      .then((response: HttpResponse) => {
        response.ok = true;

        return response;
      })
      .catch((error: HttpResponse) => {
        if (error.status !== StatusCodes.BAD_REQUEST) {
          throw error;
        }

        return catchCallback ? catchCallback(error) : error;
      });

    return httpResponse;
  };

  /**
   * postリクエストを送信する
   * @param url URL
   * @param params リクエストボディ
   * @param catchCallback 例外時のコールバック
   * @returns HttpResponse
   */
  static post = async (
    url,
    params,
    catchCallback?: (error) => HttpResponse,
  ): Promise<HttpResponse> => {
    const httpResponse = await httpClient
      .post(url, { json: params })
      .json<HttpResponse>()
      .then((response: HttpResponse) => {
        response.ok = true;

        return response;
      })
      .catch((error: HttpResponse) => {
        if (catchCallback) {
          return catchCallback(error);
        }
        if (error.status !== StatusCodes.BAD_REQUEST) {
          throw error;
        }

        return error;
      });

    return httpResponse;
  };
}
