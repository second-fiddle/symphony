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
const useIdentify = (): [
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
   */
  const handleConfirm: SubmitHandler<FormValues> = async (formValues, e) => {
    e?.preventDefault();
    try {
      const response = await httpClient
        .post('/api/signup/identify', {
          json: formValues,
        })
        .json<HttpResponse>();
      setIdentifyInfo(response.data);
      setStoredInfo(LocalStorageKey.Token, response.data.token);
      navigate('/signup/profile', { replace: true });
    } catch (exception) {
      setResult(<HttpResponse>exception);
    }
  };

  return [control, handleSubmit, handleConfirm, result];
};

export default useIdentify;
