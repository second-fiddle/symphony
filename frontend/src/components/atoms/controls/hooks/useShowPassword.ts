import { useState } from 'react';

/**
 * パスワードコントロールのイベントを定義します。
 * @returns
 */
const useShowPassword = (): [
  'text' | 'password',
  boolean,
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
] => {
  const [inputType, setInputType] = useState<'text' | 'password'>('password');
  const [showIcon, setShowIcon] = useState<boolean>(false);

  /**
   * パスワード表示アイコンクリック時のイベント
   * @param e [React.MouseEvent<HTMLButtonElement, MouseEvent>] イベント
   */
  const handleShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const isShow = inputType === 'password';
    setInputType(isShow ? 'text' : 'password');
    setShowIcon(isShow);
  };

  return [inputType, showIcon, handleShowPassword];
};

export default useShowPassword;
