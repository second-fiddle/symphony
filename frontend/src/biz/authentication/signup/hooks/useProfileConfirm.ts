import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { HttpResult } from '@/services/https';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { Member } from '@/models/member';
import { useErrorHandler } from 'react-error-boundary';
import { StatusCodes } from 'http-status-codes';
import { IdentifyInfo } from '@/models/identifyInfo';
import { omit } from 'lodash';
import { requestProfileConfirm } from '../apis/requestProfileConfirm';
import { signupSelector } from '../states/signupAtom';

/**
 * プロフィール入力画面のイベントを定義します。
 */
export const useProfileConfirm = (): [
  (e: React.FormEvent) => void,
  IdentifyInfo,
  Member,
  HttpResult | null,
] => {
  const navigate = useNavigate();
  const [{ identify, profile }, setSignup] = useRecoilState(signupSelector);
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
      ...{ temporaryMemberId: identify.temporaryMemberId },
      ...{ password_confirmation: profile.confirmPassword },
    };

    try {
      const httpResponse = await requestProfileConfirm(reqParam);
      if (httpResponse.ok) {
        setSignup({ complete: true });
        navigate('/signup/complete', { replace: true });
      } else if (httpResponse.status === StatusCodes.UNAUTHORIZED) {
        navigate('/signup/tos?timeout=', { replace: true });
      } else {
        setResult(httpResponse);
      }
    } catch (error) {
      handleError(error);
    }
  }, []);

  /**
   * 画面表示時、パスワードを削除
   */
  useEffect(() => {
    setSignup({ profile: omit(profile, ['password', 'confirmPassword']) });
  }, []);

  return [handleConfirm, <IdentifyInfo>identify, <Member>profile, result];
};
