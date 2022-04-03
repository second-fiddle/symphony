import { httpClient, HttpResult } from 'services/https';
import { useRecoilState } from 'recoil';
import { authAtom } from 'states/authAtom';
import { useCallback } from 'react';

/**
 * ログアウトのイベントを定義します。
 */
export const useLogout = (): [() => void, string | null] => {
  const [, setLoginInfo] = useRecoilState(authAtom);
  let result: string | null = null;

  /**
   * 送信ボタンクリック
   */
  const handleLogout = useCallback(async () => {
    try {
      await httpClient.post('/api/logout');
      result = 'success';
    } catch (error) {
      if ((error as HttpResult).status === 408) {
        result = 'sessionTimeout';
      }
    } finally {
      setLoginInfo(null);
    }
  }, []);

  return [handleLogout, result];
};
