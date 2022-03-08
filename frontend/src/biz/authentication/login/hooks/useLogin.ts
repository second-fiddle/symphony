import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { httpClient, HttpResponse, HttpResult } from 'services/https';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { authAtom } from 'states/authAtom';
import {
  LocalStorageKey,
  setStoredInfo,
} from 'services/resources/storages/localStorage';

type FormValues = {
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
const useLogin = (): [
  Control<FormValues>,
  UseFormHandleSubmit<FormValues>,
  (data: FormValues) => void,
  HttpResult | null,
] => {
  const [, setLoginInfo] = useRecoilState(authAtom);
  const [result, setResult] = useState<HttpResult | null>(null);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  /**
   * ログインボタンクリック
   */
  const handleLogin: SubmitHandler<FormValues> = async (values, e) => {
    e?.preventDefault();
    setResult(null);
    try {
      await httpClient.get('/sanctum/csrf-cookie');
      const response = await httpClient
        .post('/api/login', {
          json: values,
        })
        .json<HttpResponse>();

      const authInfo = response.data;
      setLoginInfo(authInfo);
      setStoredInfo(LocalStorageKey.Token, authInfo.token);

      navigate(from, { replace: true });
    } catch (error) {
      setResult(<HttpResult>error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has('changePassword')) {
      setResult({
        result: 'success',
        message: 'パスワードの変更を行いました。',
      });
    } else if (query.has('sessionTimeout')) {
      setResult({
        result: 'success',
        message:
          '長時間操作が行われなかったため、自動的にログアウトされました。',
      });
    }
  }, []);

  return [control, handleSubmit, handleLogin, result];
};

export default useLogin;
