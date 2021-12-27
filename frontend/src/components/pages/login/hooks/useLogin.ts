import { YupJa as yup } from 'utils/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useState } from 'react';
import { HttpError } from 'services/https/HttpError';
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
  string | undefined,
] => {
  const [loginErrorMessage, setLoginErrorMessage] = useState<
    string | undefined
  >(undefined);

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
  const handleLogin: SubmitHandler<FormValues> = (values) => {
    setLoginErrorMessage('');
    auth
      .signin(values.email, values.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const { response } = error as HttpError;
        setLoginErrorMessage(response.message);
      });
  };

  return [control, handleSubmit, handleLogin, loginErrorMessage];
};

export default useLogin;
