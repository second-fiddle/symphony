import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useState } from 'react';
import { httpClient, HttpResult } from 'services/https';

type FormValues = {
  email: string;
};

const schema = yup.object({
  email: yup.string().required().email(),
});

/**
 * パスワード再設定画面のイベントを定義します。
 */
const useResetPassword = (): [
  Control<FormValues>,
  UseFormHandleSubmit<FormValues>,
  (data: FormValues) => void,
  HttpResult | null,
] => {
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
        .post('/api/reset-password', {
          json: values,
        })
        .json<HttpResult>();
      setResult({ result: 'success', message: response.message });
    } catch (error) {
      setResult(<HttpResult>error);
    }
  };

  return [control, handleSubmit, handleSend, result];
};

export default useResetPassword;
