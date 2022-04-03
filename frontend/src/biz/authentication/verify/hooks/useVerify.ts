import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { httpClient, HttpResult } from 'services/https';

/**
 *メール認証画面のイベントを定義します。
 */
export const useVerify = (): [HttpResult | null] => {
  const [result, setResult] = useState<HttpResult | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const emailVerifyUrl = searchParams.get('email_verify_url');
    if (!emailVerifyUrl) {
      setResult({ result: 'error', message: '不正な操作が行われました。' });

      return;
    }

    const verify = async () => {
      const response = await httpClient.get(emailVerifyUrl).json<HttpResult>();
      setResult({ result: 'success', message: response.message });
    };
    verify().catch((error) => setResult(<HttpResult>error));
  }, []);

  return [result];
};
