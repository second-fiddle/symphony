import React, { FormEvent, useCallback, useState } from 'react';
import { HttpResult } from 'services/https';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { Member } from 'models/member';
import { useErrorHandler } from 'react-error-boundary';
import { StatusCodes } from 'http-status-codes';
import {
  signupIdentifyAtom,
  signupProfileAtom,
  signupCompleteAtom,
} from '../states/signupAtom';
import { requestProfileConfirm } from '../apis/requestProfileConfirm';

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
  const handleError = useErrorHandler();

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

    try {
      const httpResponse = await requestProfileConfirm(reqParam);
      if (httpResponse.ok) {
        setComplete(true);
        navigate('/signup/complete', { replace: true });
      } else if (httpResponse.status === StatusCodes.UNAUTHORIZED) {
        setProfile({} as Member);
        navigate('/signup/identify?timeout', { replace: true });
      } else {
        setResult(httpResponse);
      }
    } catch (error) {
      handleError(error);
    }
  }, []);

  return [handleConfirm, result];
};
