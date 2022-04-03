import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useCallback, useState } from 'react';
import { httpClient, HttpResponse, HttpResult } from 'services/https';

type FormValues = {
  email: string;
};

const schema = yup.object({
  email: yup.string().required().email(),
});

/**
 * パスワード再設定画面のイベントを定義します。
 */
export const useResetPassword = (): [
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
   * @param values: FormValues 入力内容
   * @param e イベント
   */
  const handleSend: SubmitHandler<FormValues> = useCallback(
    async (values, e) => {
      e?.preventDefault();

      await httpClient
        .post('/api/reset-password', {
          json: values,
        })
        .then(async (response: HttpResponse) => {
          const responseData = await response.json();
          setResult(responseData);
        })
        .catch((error: HttpResponse) => setResult(error));
    },
    [],
  );

  return [control, handleSubmit, handleSend, result];
};
