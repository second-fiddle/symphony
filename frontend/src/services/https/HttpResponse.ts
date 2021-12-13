/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 正常レスポンス
 */
export type HttpResponse = {
  data?: any;
  status: number;
  message?: string;
};
