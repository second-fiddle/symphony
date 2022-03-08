import { memo, useEffect, VFC } from 'react';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

import { useSetRecoilState } from 'recoil';
import { IdentifyInfo } from 'models/identifyInfo';
import { Member } from 'models/member';
import { Signup } from './signup';
import {
  signupAgreeAtom,
  signupCompleteAtom,
  signupIdentifyAtom,
  signupProfileAtom,
} from './states/signupAtom';

const SGrid = styled(Grid)`
  text-align: left;
`;

/**
 * 会員登録完了ページ
 */
export const SignupComplete: VFC = memo(() => {
  const setAgree = useSetRecoilState(signupAgreeAtom);
  const setIdentify = useSetRecoilState(signupIdentifyAtom);
  const setProfile = useSetRecoilState(signupProfileAtom);
  const setComplete = useSetRecoilState(signupCompleteAtom);
  useEffect(() => {
    setAgree(false);
    setIdentify({} as IdentifyInfo);
    setProfile({} as Member);
    setComplete(true);
  }, []);

  return (
    <Signup>
      <Grid container spacing={2}>
        <SGrid item xs={12}>
          会員登録が完了しました。
          <br />
          本人確認メールのリンクをタップ（クリック）して本登録を行ってください。
        </SGrid>
      </Grid>
    </Signup>
  );
});
