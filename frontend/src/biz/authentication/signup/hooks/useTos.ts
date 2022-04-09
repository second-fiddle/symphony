import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { HttpResult } from 'services/https';
import { signupSelector } from '../states/signupAtom';

/**
 * 利用規約画面のイベントを定義します。
 */
export const useTos = (): [
  boolean,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent) => void,
  HttpResult | null,
] => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [result, setResult] = useState<HttpResult | null>(null);
  const setSignup = useSetRecoilState(signupSelector);

  /**
   * 利用規約に同意するチェック状態変更ハンドラー
   * @param e イベント
   */
  const handleAgreeChange = useCallback((e) => {
    setAgree(e.target.checked);
  }, []);
  /**
   * 同意するボタンクリック
   * @param e イベント
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      return;
    }

    setSignup({ agree });
    navigate('/signup/identify', { replace: true });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has('timeout')) {
      setResult({
        result: 'error',
        message:
          'セッションタイムアウトが発生しました。\\n再度行ってください。',
      });
    }
  });

  return [agree, handleAgreeChange, handleSubmit, result];
};
