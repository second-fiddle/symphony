import { YupJa as yup } from '@/services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { httpClient, HttpResult } from '@/services/https';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '@/states/authAtom';
import {
  LocalStorageKey,
  setStoredInfo,
} from '@/services/resources/storages/localStorage';
import { useErrorHandler } from 'react-error-boundary';
import { requestLogin } from '../apis/requestLogin';

export type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

/**
 * ログイン画面のイベントを定義します。
 */
export const useLogin = (): [
  Control<FormValues>,
  UseFormHandleSubmit<FormValues>,
  (data: FormValues) => void,
  HttpResult | null,
] => {
  const setLoginInfo = useSetRecoilState(authAtom);
  const [result, setResult] = useState<HttpResult | null>(null);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  const from = window.location.pathname || '/';

  /**
   * ログインボタンクリック
   * @param e イベント
   */
  const handleLogin: SubmitHandler<FormValues> = useCallback(
    async (values, e) => {
      e?.preventDefault();

      try {
        await httpClient.get('/sanctum/csrf-cookie');
        const httpResponse = await requestLogin(values);
        if (httpResponse.ok) {
          const authInfo = httpResponse.data;
          setLoginInfo(authInfo);
          setStoredInfo(LocalStorageKey.Token, authInfo.token);

          navigate(from, { replace: true });
        } else {
          setResult(httpResponse);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [],
  );
  /**
   * 初期表示
   */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has('changePassword')) {
      setResult({
        result: 'success',
        message: 'パスワードの変更を行いました。',
      });
    }
  }, []);

  return [control, handleSubmit, handleLogin, result];
};
