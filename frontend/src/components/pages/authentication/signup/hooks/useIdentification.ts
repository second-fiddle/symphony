import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useState } from 'react';

import { httpClient, HttpResponse, HttpResult } from 'services/https';

type FormValues = {
  unionCd: string;
  email: string;
  password: string;
};

const schema = yup.object({
  unionCd: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
});

/**
 * 本人確認画面のイベントを定義します。
 */
const useIdentification = (): [
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
   * 確認ボタンクリック
   */
  const handleConfirm: SubmitHandler<FormValues> = async (formValues, e) => {
    e?.preventDefault();
    setResult(null);
    try {
      const response = await httpClient
        .post('/api/signin/identify', {
          json: formValues,
        })
        .json<HttpResponse>();
      setResult(response);
    } catch (exception) {
      setResult(<HttpResponse>exception);
    }
  };

  return [control, handleSubmit, handleConfirm, result];
};

export default useIdentification;
