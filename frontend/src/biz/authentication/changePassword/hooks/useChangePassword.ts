import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { httpClient, HttpResult } from 'services/https';
import { useNavigate } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';
import { requestChangePassword } from '../apis/requestChangePassword';

type FormValues = {
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  password: yup
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!-/:-@[-`{-~])[!-~]{8,}$/i,
      '半角英数字、記号をそれぞれ1つ以上指定してください',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'パスワードが一致しません'),
});

/**
 * パスワード再設定画面のイベントを定義します。
 */
export const useChangePassword = (): [
  Control<FormValues>,
  UseFormHandleSubmit<FormValues>,
  (data: FormValues) => void,
  HttpResult | null,
] => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>();
  const [token, setToken] = useState<string | null>();
  const [result, setResult] = useState<HttpResult | null>(null);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const handleError = useErrorHandler();

  /**
   * 送信ボタンクリック
   * @param values: FormValues 入力内容
   * @param e イベント
   */
  const handleSend: SubmitHandler<FormValues> = useCallback(
    async (values, e) => {
      e?.preventDefault();
      try {
        await httpClient.get('/sanctum/csrf-cookie');

        const params = {
          password: values.password,
          password_confirmation: values.confirmPassword,
          email,
          token,
        };
        const httpResponse = await requestChangePassword(params);
        if (httpResponse.ok) {
          navigate('/login?changePassword=', { replace: true });
        } else {
          setResult(httpResponse);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [email, token],
  );
  /**
   * 初期表示
   */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    setEmail(query.get('email'));
    setToken(query.get('token'));
  }, []);

  return [control, handleSubmit, handleSend, result];
};
