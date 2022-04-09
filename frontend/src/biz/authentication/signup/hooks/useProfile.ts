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
import { HttpResult } from 'services/https';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import { useErrorHandler } from 'react-error-boundary';
import { IdentifyInfo } from 'models/identifyInfo';
import { Member } from 'models/member';
import { signupSelector } from '../states/signupAtom';
import { requestProfile } from '../apis/requestProfile';

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
  IdentifyInfo,
  Member,
  HttpResult | null,
] => {
  const navigate = useNavigate();
  const [{ identify, profile }, setSignup] = useRecoilState(signupSelector);
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

      const reqParam = {
        ...formValues,
        ...{ temporaryMemberId: identify.temporaryMemberId },
        ...{ password_confirmation: formValues.confirmPassword },
      };
      try {
        const httpResponse = await requestProfile(reqParam);
        if (httpResponse.ok) {
          setSignup({
            profile: formValues,
          });
          navigate('/signup/confirm', { replace: false });
        } else if (httpResponse.status === StatusCodes.UNAUTHORIZED) {
          navigate('/signup/tos?timeout', { replace: true });
        } else {
          setResult(httpResponse);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [],
  );

  return [
    control,
    handleSubmit,
    handleConfirm,
    <IdentifyInfo>identify,
    <Member>profile,
    result,
  ];
};
