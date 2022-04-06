import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { signupAgreeAtom } from '../states/signupAtom';

/**
 * 利用規約画面のイベントを定義します。
 */
export const useTos = (): [
  boolean,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent) => void,
] => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const setAgreed = useSetRecoilState(signupAgreeAtom);
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

    setAgreed(agree);
    navigate('/signup/identify', { replace: true });
  };

  return [agree, handleAgreeChange, handleSubmit];
};
