import { useState } from 'react';
import { httpClient, HttpResponse, HttpResult } from 'services/https';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';
import { signupIdentifyAtom, signupProfileAtom } from '../states/signupAtom';

/**
 * プロフィール入力画面のイベントを定義します。
 */
export const useProfileConfirm = (): [() => void, HttpResult | null] => {
  const navigate = useNavigate();
  const profile = useRecoilValue(signupProfileAtom);
  const identifyInfo = useRecoilValue(signupIdentifyAtom);
  const [result, setResult] = useState<HttpResult | null>(null);

  /**
   * 確認ボタンクリック
   */
  const handleConfirm = async () => {
    try {
      const reqParam = {
        ...profile,
        ...{ temporaryMemberId: identifyInfo.temporaryMemberId },
        ...{ password_confirmation: profile.confirmPassword },
      };
      await httpClient
        .post('/api/signup/register', {
          json: reqParam,
        })
        .json<HttpResponse>();
      navigate('/signup/complete', { replace: true });
    } catch (exception) {
      setResult(<HttpResponse>exception);
    }
  };

  return [handleConfirm, result];
};
