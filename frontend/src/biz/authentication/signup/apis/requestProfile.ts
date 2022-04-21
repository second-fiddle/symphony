import { StatusCodes } from 'http-status-codes';
import { HttpResponse, httpService } from '@/services/https';
import { FormValues } from '../hooks/useProfile';

/**
 * エラーハンドラー
 * @param error Httpレスポンス
 * @returns Httpレスポンス
 */
const catchCallback = (error: HttpResponse) => {
  if (
    error.status === StatusCodes.UNAUTHORIZED ||
    error.status === StatusCodes.BAD_REQUEST
  ) {
    return error;
  }
  throw error;
};

/**
 * プロフィールを送信する
 * @param values プロフィールデータ
 * @returns Httpレスポンス
 */
export const requestProfile = async (
  values: FormValues,
): Promise<HttpResponse> => {
  const httpResponse = await httpService.post(
    '/api/signup/profile',
    values,
    catchCallback,
  );

  return httpResponse;
};
