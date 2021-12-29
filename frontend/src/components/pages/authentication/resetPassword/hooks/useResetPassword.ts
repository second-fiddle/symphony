import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useState } from 'react';
import ApiClient from 'services/https/apiClient';
import { HttpResponse } from 'services/https/HttpResponse';
import { HttpError } from 'services/https/HttpError';

type FormValues = {
  email: string;
};
type Result = {
  result: 'success' | 'error';
  message?: string;
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
  Result | null,
] => {
  const [result, setResult] = useState<Result | null>(null);

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
      const response = await ApiClient.post('/api/reset-password', {
        json: values,
      }).json<HttpResponse>();
      setResult({ result: 'success', message: response.message });
    } catch (error) {
      const { response } = <HttpError>error;
      const message = response.data.email
        ? response.data.email
        : response.message;
      setResult({ result: 'error', message });
    }
  };

  return [control, handleSubmit, handleSend, result];
};

export default useResetPassword;
