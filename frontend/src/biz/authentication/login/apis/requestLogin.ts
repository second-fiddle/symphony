import { StatusCodes } from 'http-status-codes';
import { HttpResponse, httpService } from 'services/https';

/**
 * エラーハンドラー
 * @param error Httpレスポンス
 * @returns Httpレスポンス
 */
const catchCallback = (error: HttpResponse) => {
  if (error.status === StatusCodes.UNAUTHORIZED) {
    return error;
  }
  throw error;
};

/**
 * ログインを行う
 * @param values 認証データ
 * @returns Httpレスポンス
 */
export const requestLogin = async (values): Promise<HttpResponse> => {
  const httpResponse = await httpService.post(
    '/api/login',
    values,
    catchCallback,
  );

  return httpResponse;
};
