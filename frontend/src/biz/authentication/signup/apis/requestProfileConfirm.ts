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
 * プロフィールを送信する
 * @param values プロフィールデータ
 * @returns Httpレスポンス
 */
export const requestProfileConfirm = async (values): Promise<HttpResponse> => {
  const httpResponse = await httpService.post(
    '/api/signup/register',
    values,
    catchCallback,
  );

  return httpResponse;
};
