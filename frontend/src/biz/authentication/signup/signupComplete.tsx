import { VFC } from 'react';
import { Grid } from '@mui/material';
import { Signup } from './signup';

/**
 * 会員登録完了ページ
 */
export const SignupComplete: VFC = () => (
  <Signup>
    <Grid container spacing={2}>
      <Grid item xs={12} className="tl">
        会員登録が完了しました。
        <br />
        本人確認メールのリンクをタップ（クリック）して本登録を行ってください。
      </Grid>
    </Grid>
  </Signup>
);
