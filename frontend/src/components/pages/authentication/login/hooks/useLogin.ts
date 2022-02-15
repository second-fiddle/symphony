import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { HttpResult } from 'services/https';
import { useLocation, useNavigate } from 'react-router';
import useAuth from 'hooks/auth/useAuth';

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
  const [result, setResult] = useState<HttpResult | null>(null);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  /**
   * ログインボタンクリック
   */
  const handleLogin: SubmitHandler<FormValues> = async (values, e) => {
    e?.preventDefault();
    setResult(null);
    try {
      await auth.signin(values.email, values.password);
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
    }
  }, []);

  return [control, handleSubmit, handleLogin, result];
};

export default useLogin;
