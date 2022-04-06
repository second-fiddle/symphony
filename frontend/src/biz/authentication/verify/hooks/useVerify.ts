import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HttpResult, httpService } from 'services/https';

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
      const httpResponse = await httpService.get(emailVerifyUrl);
      if (httpResponse.ok) {
        setResult({ result: 'success', message: httpResponse.message });
      } else {
        setResult(httpResponse);
      }
    };
    verify().catch((error) => setResult(error));
  }, []);

  return [result];
};
