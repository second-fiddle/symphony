import { YupJa as yup } from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { httpClient, HttpResponse, HttpResult } from 'services/https';
import { useSetRecoilState } from 'recoil';
import { IdentifyInfo } from 'models/identifyInfo';
import {
  LocalStorageKey,
  setStoredInfo,
} from 'services/resources/storages/localStorage';
import { useNavigate } from 'react-router';
import { signupIdentifyAtom } from '../states/signupAtom';

type FormValues = {
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
  const setIdentifyInfo = useSetRecoilState<IdentifyInfo>(signupIdentifyAtom);
  const [result, setResult] = useState<HttpResult | null>(null);
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  /**
   * 確認ボタンクリック
   * @param e イベント
   */
  const handleConfirm: SubmitHandler<FormValues> = useCallback(
    async (formValues, e) => {
      e?.preventDefault();

      await httpClient
        .post('/api/signup/identify', {
          json: formValues,
        })
        .then(async (response: HttpResponse) => {
          const responseData = await response.json();
          setIdentifyInfo(responseData.data);
          setStoredInfo(LocalStorageKey.Token, responseData.data.token);
          navigate('/signup/profile', { replace: false });
        })
        .catch((error: HttpResponse) => setResult(error));
    },
    [],
  );

  /**
   * 初期表示
   */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.has('timeout')) {
      setResult({
        result: 'error',
        message:
          'セッションタイムアウトが発生しました。\\n再度本人確認から行ってください。',
      });
    }
  }, []);

  return [control, handleSubmit, handleConfirm, result];
};
