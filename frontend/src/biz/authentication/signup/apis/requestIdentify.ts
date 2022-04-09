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
 * 本人確認を行う
 * @param values 認証データ
 * @returns Httpレスポンス
 */
export const requestIdentify = async (values): Promise<HttpResponse> => {
  const httpResponse = await httpService.post(
    '/api/signup/identify',
    values,
    catchCallback,
  );

  return httpResponse;
};
