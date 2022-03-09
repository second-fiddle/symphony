/**
 * HTTP結果タイプ
 */
export type HttpResultType = 'error' | 'warning' | 'info' | 'success';
/**
 * HTTPレスポンス
 */
export type HttpResult = {
  status?: number;
  result?: HttpResultType;
  data?: any;
  message?: string;
  errors?: { [name: string]: Array<string> };
};
/**
 * Httpリクエストの結果
 */
export type HttpResponse = HttpResult & Response;
/**
 * Httpリクエスト成功時のオブジェクトを作成する
 * @param response レスポンス
 * @returns Httpレスポンス
 */
export const createSuccessResponse = (response): HttpResponse => {
  const success = <HttpResponse>{};
  success.result = 'success';
  success.data = response.data;
  success.message = response.message;

  return success;
};
/**
 * Httpリクエスト失敗時のオブジェクトを作成する
 * @param response レスポンス
 * @returns Httpレスポンス
 */
export const createErrorResponse = (response): HttpResponse => {
  const error = <HttpResponse>{};
  error.status = response.status;
  error.result = 'error';
  error.message = response.message;
  error.errors = response.data;

  return error;
};
