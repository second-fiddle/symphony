import { VFC } from 'react';
import {
  Button,
  RhfEmailField,
  RhfPasswordField,
  RhfTelField,
  RhfTextField,
} from 'components/ui/inputs';
import { Box, Stack } from '@mui/material';
import { Alert } from 'components/ui/notifications';
import { useRecoilValue } from 'recoil';
import useProfile from './hooks/useProfile';
import { signupIdentifyAtom, signupProfileAtom } from './states/signupAtom';
import { Signup } from './signup';

/**
 * ユーザープロフィール入力ページ
 */
const SignupProfile: VFC = () => {
  const identifyInfo = useRecoilValue(signupIdentifyAtom);
  const profile = useRecoilValue(signupProfileAtom);
  const [control, handleSubmit, handleConfirm, httpResponse] = useProfile();

  return (
    <Signup>
      <Alert severity={httpResponse?.result} message={httpResponse?.message} />
      <form onSubmit={handleSubmit(handleConfirm)}>
        <Stack spacing={2}>
          <Box sx={{ textAlign: 'left' }}>
            {identifyInfo.propertyName} {identifyInfo.roomNo}
          </Box>
          <RhfEmailField
            id="email"
            name="email"
            label="メールアドレス"
            autoComplete="email"
            required
            defaultValue={profile.email}
            control={control}
            errors={httpResponse?.errors}
          />
          <RhfPasswordField
            id="password"
            name="password"
            label="パスワード"
            required
            defaultValue={profile.password}
            showEndIcon
            control={control}
            errors={httpResponse?.errors}
          />
          <RhfPasswordField
            id="confirm-password"
            name="confirmPassword"
            label="パスワード(確認用)"
            defaultValue={profile.confirmPassword}
            showEndIcon
            control={control}
            errors={httpResponse?.errors}
          />
          <RhfTextField
            id="nickname"
            name="nickname"
            label="ニックネーム"
            autoComplete="nickname"
            required
            defaultValue={profile.nickname ?? identifyInfo.roomNo}
            control={control}
            errors={httpResponse?.errors}
          />
          <Box sx={{ textAlign: 'left' }}>
            <RhfTextField
              id="last-name"
              name="lastName"
              label="姓"
              defaultValue={profile.lastName}
              inputProps={{ size: 12 }}
              sx={{ marginRight: '13px' }}
              control={control}
              errors={httpResponse?.errors}
            />
            <RhfTextField
              id="first-name"
              name="firstName"
              label="名"
              defaultValue={profile.firstName}
              inputProps={{ size: 12 }}
              control={control}
              errors={httpResponse?.errors}
            />
          </Box>
          <Box sx={{ textAlign: 'left' }}>
            <RhfTextField
              id="last-name-ruby"
              name="lastNameRuby"
              label="姓(ふりがな)"
              defaultValue={profile.lastNameRuby}
              inputProps={{ size: 12 }}
              sx={{ marginRight: '13px' }}
              control={control}
              errors={httpResponse?.errors}
            />
            <RhfTextField
              id="first-name-ruby"
              name="firstNameRuby"
              label="名(ふりがな)"
              defaultValue={profile.firstNameRuby}
              inputProps={{ size: 12 }}
              control={control}
              errors={httpResponse?.errors}
            />
          </Box>
          <RhfTelField
            id="tel1"
            name="tel1"
            label="連絡先1"
            autoComplete="tel"
            placeholder="09012345678"
            defaultValue={profile.tel1}
            control={control}
            errors={httpResponse?.errors}
          />
          <RhfTelField
            id="tel2"
            name="tel2"
            label="連絡先2"
            placeholder="09012345678"
            defaultValue={profile.tel2}
            control={control}
            errors={httpResponse?.errors}
          />
          <Button>確認</Button>
        </Stack>
      </form>
    </Signup>
  );
};

export { SignupProfile };
