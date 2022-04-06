import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useCallback, useState } from 'react';
import { HttpResult } from 'services/https';
import { useErrorHandler } from 'react-error-boundary';
import { requestResetPassword } from '../apis/requestResetPassword';

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
        const httpResponse = await requestResetPassword(values);
        setResult(httpResponse);
      } catch (error) {
        handleError(error);
      }
    },
    [],
  );

  return [control, handleSubmit, handleSend, result];
};
