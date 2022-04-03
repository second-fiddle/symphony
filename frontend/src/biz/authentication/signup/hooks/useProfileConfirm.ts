import React, { FormEvent, useCallback, useState } from 'react';
import { httpClient, HttpResult } from 'services/https';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { Member } from 'models/member';
import {
  signupIdentifyAtom,
  signupProfileAtom,
  signupCompleteAtom,
} from '../states/signupAtom';

/**
 * プロフィール入力画面のイベントを定義します。
 */
export const useProfileConfirm = (): [
  (e: React.FormEvent) => void,
  HttpResult | null,
] => {
  const navigate = useNavigate();
  const [profile, setProfile] = useRecoilState(signupProfileAtom);
  const identifyInfo = useRecoilValue(signupIdentifyAtom);
  const setComplete = useSetRecoilState(signupCompleteAtom);
  const [result, setResult] = useState<HttpResult | null>(null);

  /**
   * 確認ボタンクリック
   * @param e イベント
   */
  const handleConfirm = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const reqParam = {
      ...profile,
      ...{ temporaryMemberId: identifyInfo.temporaryMemberId },
      ...{ password_confirmation: profile.confirmPassword },
    };
    await httpClient
      .post('/api/signup/register', {
        json: reqParam,
      })
      .then(() => {
        setComplete(true);
        navigate('/signup/complete', { replace: true });
      })
      .catch((error) => {
        if (error.status === 400) {
          setResult(error);
        } else if (error.status === 401) {
          setProfile({} as Member);
          navigate('/signup/identify?timeout', { replace: true });
        } else {
          throw error;
        }
      });
  }, []);

  return [handleConfirm, result];
};
