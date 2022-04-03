import { useCallback, useState } from 'react';
import {
  passwordConfirmValidator,
  passwordValidator,
  YupJa as yup,
} from 'services/validations/yup/i18n/yupJa';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { httpClient, HttpResponse, HttpResult } from 'services/https';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { signupIdentifyAtom, signupProfileAtom } from '../states/signupAtom';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  lastName: string;
  firstName: string;
  lastNameRuby: string;
  firstNameRuby: string;
  tel1: string;
  tel2: string;
};

const schema = yup.object({
  email: yup.string().required().email(),
  password: passwordValidator(),
  confirmPassword: passwordConfirmValidator('password'),
  nickname: yup.string().required().max(20),
  lastName: yup.string().nullable().max(20),
  firstName: yup.string().nullable().max(20),
  lastNameRuby: yup.string().nullable().max(40),
  firstNameRuby: yup.string().nullable().max(40),
  tel1: yup.string().nullable().max(13).tel(),
  tel2: yup.string().nullable().max(13).tel(),
});

/**
 * プロフィール入力画面のイベントを定義します。
 */
export const useProfile = (): [
  Control<FormValues>,
  UseFormHandleSubmit<FormValues>,
  (data: FormValues) => void,
  HttpResult | null,
] => {
  const navigate = useNavigate();
  const identifyInfo = useRecoilValue(signupIdentifyAtom);
  const setProfile = useSetRecoilState(signupProfileAtom);
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
      const reqParam = {
        ...formValues,
        ...{ temporaryMemberId: identifyInfo.temporaryMemberId },
        ...{ password_confirmation: formValues.confirmPassword },
      };
      await httpClient
        .post('/api/signup/profile', {
          json: reqParam,
        })
        .then(() => {
          setProfile(formValues);
          navigate('/signup/confirm', { replace: false });
        })
        .catch((error: HttpResponse) => {
          if (error.status === 400) {
            setResult(error);
          } else if (error.status === 401) {
            navigate('/signup/identify?timeout', { replace: true });
          } else {
            throw error;
          }
        });
    },
    [],
  );

  return [control, handleSubmit, handleConfirm, result];
};
