import { HttpResponse, httpService } from 'services/https';

/**
 * 本人確認を行う
 * @param values 認証データ
 * @returns Httpレスポンス
 */
export const requestIdentify = async (values): Promise<HttpResponse> => {
  const httpResponse = await httpService.post('/api/signup/identify', values);

  return httpResponse;
};
