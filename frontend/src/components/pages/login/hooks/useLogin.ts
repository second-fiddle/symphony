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
  email: yup.string().required().email().label('メールアドレス'),
  password: yup.string().required().label('パスワード'),
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
    try {
      auth.signin(values.email, values.password, () => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      });

      // await kyClient.get('/sanctum/csrf-cookie');
      // const response = await kyClient
      //   .post('/api/login', { json: values })
      //   .json<HttpResponse>();

      // console.log(response);
      // console.log('[login]ログイン成功');
    } catch (error) {
      const { response } = error as HttpError;
      setLoginErrorMessage(response.message);
    }
  };

  return [control, handleSubmit, handleLogin, loginErrorMessage];
};

export default useLogin;
