import { VFC } from 'react';
import PageTitle from 'components/pages/authentication/pageTitle';
import { RhfPasswordField } from 'components/molecules/controls';
import styled from '@emotion/styled';
import { Alert, Box, Button, Container, Stack } from '@mui/material';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import useChangePassword from './hooks/useChangePassword';

const SContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;
const SBox = styled(Box)`
  max-width: 370px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
`;
const SAlert = styled(Alert)`
  margin-bottom: 20px;
  text-align: left;
`;

/**
 * パスワード変更ページ
 */
const ChangePassword: VFC = () => {
  const [control, handleSubmit, handleLogin, submitResult] =
    useChangePassword();

  if (submitResult && submitResult.result === 'success') {
    return <Navigate to="/login?changePassword=" />;
  }

  return (
    <>
      <SContainer maxWidth="sm">
        <SBox>
          <PageTitle title="パスワード設定" />
          {submitResult && (
            <SAlert variant="outlined" severity="error">
              <span
                dangerouslySetInnerHTML={{
                  __html: submitResult.message ?? '',
                }}
              />
              <Link to="/reset-password">こちら</Link>
            </SAlert>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={2}>
              <RhfPasswordField
                id="password"
                name="password"
                label="パスワード"
                required
                showStartIcon
                showEndIcon
                control={control}
              />
              <RhfPasswordField
                id="confirm-password"
                name="confirmPassword"
                label="パスワード(確認用)"
                showStartIcon
                showEndIcon
                control={control}
              />
              <Button type="submit" variant="contained" fullWidth>
                パスワード設定
              </Button>
            </Stack>
          </form>
        </SBox>
      </SContainer>
    </>
  );
};
export { ChangePassword };
