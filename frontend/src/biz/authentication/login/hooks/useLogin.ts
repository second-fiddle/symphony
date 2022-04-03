import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { httpClient, HttpResponse, HttpResult } from 'services/https'; // HttpResponse
import { useLocation, useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
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
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  /**
   * ログインボタンクリック
   * @param e イベント
   */
  const handleLogin: SubmitHandler<FormValues> = useCallback(
    async (values, e) => {
      e?.preventDefault();
      await httpClient.get('/sanctum/csrf-cookie');
      await httpClient
        .post('/api/login', {
          json: values,
        })
        .then(async (response: HttpResponse) => {
          const responseData = await response.json();
          const authInfo = responseData.data;
          setLoginInfo(authInfo);
          setStoredInfo(LocalStorageKey.Token, authInfo.token);

          navigate(from, { replace: true });
        })
        .catch((error: HttpResponse) => setResult(error));
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
    } else if (query.has('sessionTimeout')) {
      // TODO セッションタイムアウトページ作る(ErrorBoundaryで対応)
      setResult({
        result: 'success',
        message:
          '長時間操作が行われなかったため、自動的にログアウトされました。',
      });
    }
  }, []);

  return [control, handleSubmit, handleLogin, result];
};
