import { memo, VFC } from 'react';
import { Button, RhfEmailField } from 'components/ui/inputs';
import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthenticationLayout } from 'biz/layouts/authentication';
import useResetPassword from './hooks/useResetPassword';

const SBackDiv = styled('div')`
  text-align: left;
  margin-top: 20px;
`;

/**
 * パスワードの再設定ページ
 */
export const ResetPassword: VFC = memo(() => {
  const [control, handleSubmit, handleSend, httpResponse] = useResetPassword();

  return (
    <AuthenticationLayout
      title="パスワードの再設定"
      result={httpResponse?.result}
      message={httpResponse?.message}
    >
      <form onSubmit={handleSubmit(handleSend)}>
        <Stack spacing={2}>
          <RhfEmailField
            id="email"
            name="email"
            label="メールアドレス"
            required
            showStartIcon
            control={control}
            errors={httpResponse?.errors}
          />
          <Button>送信</Button>
        </Stack>
      </form>

      <SBackDiv>
        <Link to="/login" className="item">
          ログイン画面へ
        </Link>
      </SBackDiv>
    </AuthenticationLayout>
  );
});
