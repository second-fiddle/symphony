import { httpClient, HttpResult } from 'services/https';
import { useRecoilState } from 'recoil';
import { authAtom } from 'states/authAtom';

/**
 * ログアウトのイベントを定義します。
 */
const useLogout = (): [() => void, string | null] => {
  const [, setLoginInfo] = useRecoilState(authAtom);
  let result: string | null = null;

  /**
   * 送信ボタンクリック
   */
  const handleLogout = async () => {
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
  };

  return [handleLogout, result];
};

export default useLogout;
