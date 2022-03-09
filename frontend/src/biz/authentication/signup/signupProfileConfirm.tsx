import { memo, VFC } from 'react';
import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { format } from 'services/utils/TelUtil';
import { Alert } from 'components/ui/notifications';
import { Button } from 'components/ui/inputs';
import { useProfileConfirm } from './hooks/useProfileConfirm';
import { signupProfileAtom, signupIdentifyAtom } from './states/signupAtom';
import { Signup } from './signup';

const SGrid = styled(Grid)`
  text-align: left;
`;

/**
 * ユーザープロフィール入力確認ページ
 */
export const SignupProfileConfirm: VFC = memo(() => {
  const identifyInfo = useRecoilValue(signupIdentifyAtom);
  const profile = useRecoilValue(signupProfileAtom);
  const [handleConfirm, httpResponse] = useProfileConfirm();

  return (
    <Signup>
      <form onSubmit={handleConfirm}>
        <Alert
          severity={httpResponse?.result}
          message={httpResponse?.message}
        />
        <Grid container spacing={2}>
          <SGrid item xs={12}>
            {identifyInfo.propertyName} {identifyInfo.roomNo}
          </SGrid>
          <SGrid item xs={6}>
            メールアドレス
          </SGrid>
          <SGrid item xs={6}>
            {profile.email}
          </SGrid>
          <SGrid item xs={6}>
            パスワード
          </SGrid>
          <SGrid item xs={6}>
            ********
          </SGrid>
          <SGrid item xs={6}>
            ニックネーム
          </SGrid>
          <SGrid item xs={6}>
            {profile.nickname}
          </SGrid>
          <SGrid item xs={6}>
            名前・姓
          </SGrid>
          <SGrid item xs={6}>
            {profile.lastName}
          </SGrid>
          <SGrid item xs={6}>
            名前・名
          </SGrid>
          <SGrid item xs={6}>
            {profile.firstName}
          </SGrid>
          <SGrid item xs={6}>
            名前・姓（ふりがな）
          </SGrid>
          <SGrid item xs={6}>
            {profile.lastNameRuby}
          </SGrid>
          <SGrid item xs={6}>
            名前・名（ふりがな）
          </SGrid>
          <SGrid item xs={6}>
            {profile.firstNameRuby}
          </SGrid>
          <SGrid item xs={6}>
            連絡先1
          </SGrid>
          <SGrid item xs={6}>
            {format(profile.tel1)}
          </SGrid>
          <SGrid item xs={6}>
            連絡先2
          </SGrid>
          <SGrid item xs={6}>
            {format(profile.tel2)}
          </SGrid>
          <Grid item xs={12}>
            <Button>登録</Button>
          </Grid>
        </Grid>
      </form>
    </Signup>
  );
});
