import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { signupAgreeAtom, signupCompleteAtom } from '../states/signupAtom';

type Page = {
  title: string;
  back?: string;
};

type PageDefine = {
  [key: string]: Page;
};

const pageDefines: PageDefine = {
  tos: {
    title: '利用規約',
    back: undefined,
  },
  identify: {
    title: '本人確認',
    back: 'tos',
  },
  profile: {
    title: 'プロフィール入力',
    back: 'identify',
  },
  confirm: {
    title: 'プロフィール入力確認',
    back: 'profile',
  },
  complete: {
    title: '登録完了',
    back: undefined,
  },
};
/**
 * サインイン画面のイベントを定義します。
 */
export const useSignup = (): [Page, () => void] => {
  const navigate = useNavigate();
  const agreed = useRecoilValue(signupAgreeAtom);
  const complete = useRecoilValue(signupCompleteAtom);
  const location = useLocation();
  const path = location.pathname.replace('/signup/', '') ?? 'tos';
  const pageDefine = pageDefines[path];
  /**
   * 戻るリンク
   */
  const handleBack = useCallback(() => {
    if (pageDefine.back) {
      navigate(`/signup/${pageDefine.back}`, { replace: false });
    }
  }, []);

  useEffect(() => {
    if (complete) {
      navigate('/signup/complete', { state: { x: 1 }, replace: true });
    } else if (path !== 'tos' && !agreed) {
      navigate('/signup/tos', { replace: true });
    }
  }, []);

  return [pageDefine, handleBack];
};
