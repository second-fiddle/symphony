import { HttpResponse, httpService } from 'services/https';

/**
 * パスワード変更を行う
 * @returns Httpレスポンス
 */
export const requestLogout = async (): Promise<HttpResponse> => {
  const httpResponse = await httpService.post('/api/logout');

  return httpResponse;
};
