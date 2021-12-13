import { useState } from 'react';

/**
 * パスワードコントロールのイベントを定義します。
 * @returns
 */
const useShowPassword = (): [
  'text' | 'password',
  string,
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
] => {
  const [inputType, setInputType] = useState<'text' | 'password'>('password');
  const [iconType, setIconType] = useState('slash');

  /**
   * パスワード表示アイコンクリック時のイベント
   * @param e [React.MouseEvent<HTMLButtonElement, MouseEvent>] イベント
   */
  const showPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const isShow = inputType === 'password';
    setInputType(isShow ? 'text' : 'password');
    setIconType(isShow ? '' : 'slash');
  };

  return [inputType, iconType, showPassword];
};

export default useShowPassword;
