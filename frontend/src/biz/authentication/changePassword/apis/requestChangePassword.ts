import { HttpResponse, httpService } from 'services/https';

/**
 * パスワード変更を行う
 * @param values メールアドレス
 * @returns Httpレスポンス
 */
export const requestChangePassword = async (values): Promise<HttpResponse> => {
  const httpResponse = await httpService.post('/api/change-password', values);

  return httpResponse;
};
