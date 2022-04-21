import { useCallback, useState } from 'react';
import { YupJa as yup } from '@/services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { HttpResult } from '@/services/https';
import { useSetRecoilState } from 'recoil';
import {
  LocalStorageKey,
  setStoredInfo,
} from '@/services/resources/storages/localStorage';
import { useNavigate } from 'react-router';
import { useErrorHandler } from 'react-error-boundary';
import { signupSelector } from '../states/signupAtom';
import { requestIdentify } from '../apis/requestIdentify';

export type FormValues = {
  propertyCd: string;
  roomNo: string;
  password: string;
};

const schema = yup.object({
  propertyCd: yup.string().required(),
  roomNo: yup.string().required(),
  password: yup.string().required(),
});

/**
 * 本人確認画面のイベントを定義します。
 */
export const useIdentify = (): [
  Control<FormValues>,
  UseFormHandleSubmit<FormValues>,
  (data: FormValues) => void,
  HttpResult | null,
] => {
  const navigate = useNavigate();
  const setIdentifyInfo = useSetRecoilState(signupSelector);
  const [result, setResult] = useState<HttpResult | null>(null);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const handleError = useErrorHandler();

  /**
   * 確認ボタンクリック
   * @param e イベント
   */
  const handleConfirm: SubmitHandler<FormValues> = useCallback(
    async (formValues, e) => {
      e?.preventDefault();

      try {
        const httpResponse = await requestIdentify(formValues);
        if (httpResponse.ok) {
          const identify = httpResponse.data;
          setIdentifyInfo({ identify });
          setStoredInfo(LocalStorageKey.Token, identify.token);
          navigate('/signup/profile', { replace: false });
        } else {
          setResult(httpResponse);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [],
  );

  return [control, handleSubmit, handleConfirm, result];
};
