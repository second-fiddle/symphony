/**
 * HTTP結果タイプ
 */
export type HttpResultType = 'error' | 'warning' | 'info' | 'success';
/**
 * HTTPレスポンス
 */
export type HttpResult = {
  ok?: boolean;
  status?: number;
  result?: HttpResultType;
  data?: any; // eslint-disable-line
  message?: string;
  errors?: { [name: string]: Array<string> };
};
/**
 * Httpリクエストの結果
 */
export type HttpResponse = HttpResult & Response;
/**
 * Httpレスポンスオブジェクトを作成する
 * @param ok boolean Httpリクエスト結果(true / false)
 * @param response レスポンス
 * @returns Httpレスポンス
 */
export const createResponse = (ok: boolean, response): HttpResponse => {
  const httpResponse = <HttpResponse>{};
  httpResponse.status = response.status;
  httpResponse.result = ok ? 'success' : 'error';
  httpResponse.data = ok ? response.data : null;
  httpResponse.message = response.message;
  httpResponse.errors = !ok ? response.data : null;

  return httpResponse;
};
