import { useSetRecoilState } from 'recoil';
import { authAtom } from 'states/authAtom';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { requestLogout } from '../apis/requestLogout';

/**
 * ログアウトのイベントを定義します。
 */
export const useLogout = (): [() => void] => {
  const setLoginInfo = useSetRecoilState(authAtom);
  const navigate = useNavigate();

  /**
   * 送信ボタンクリック
   */
  const handleLogout = useCallback(async () => {
    const httpResponse = await requestLogout();
    const redirect = httpResponse.ok ? '/login' : '/login?sessionTimeout=';
    setLoginInfo(null);
    navigate(redirect, { replace: true });
  }, []);

  return [handleLogout];
};
