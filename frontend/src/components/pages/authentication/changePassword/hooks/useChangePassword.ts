import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { httpClient, HttpResult } from 'services/https';

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
const useChangePassword = (): [
  Control<FormValues>,
  UseFormHandleSubmit<FormValues>,
  (data: FormValues) => void,
  HttpResult | null,
] => {
  const [email, setEmail] = useState<string | null>();
  const [token, setToken] = useState<string | null>();
  const [result, setResult] = useState<HttpResult | null>(null);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  /**
   * 送信ボタンクリック
   */
  const handleSend: SubmitHandler<FormValues> = async (values, e) => {
    e?.preventDefault();
    setResult(null);
    try {
      const response = await httpClient
        .post('/api/change-password', {
          json: {
            password: values.password,
            password_confirmation: values.confirmPassword,
            email,
            token,
          },
        })
        .json<HttpResult>();
      setResult({ result: 'success', message: response.message });
    } catch (error) {
      setResult(<HttpResult>error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    setEmail(query.get('email'));
    setToken(query.get('token'));
  }, []);

  return [control, handleSubmit, handleSend, result];
};

export default useChangePassword;
