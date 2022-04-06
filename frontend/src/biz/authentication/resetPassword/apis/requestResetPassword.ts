import { HttpResponse, httpService } from 'services/https';

/**
 * パスワード再設定メール送信を行う
 * @param values メールアドレス
 * @returns Httpレスポンス
 */
export const requestResetPassword = async (values): Promise<HttpResponse> => {
  const httpResponse = await httpService.post('/api/reset-password', values);

  return httpResponse;
};
