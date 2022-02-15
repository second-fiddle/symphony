import { VFC } from 'react';
import PageTitle from 'components/pages/authentication/pageTitle';
import { RhfPasswordField } from 'components/molecules/controls';
import styled from '@emotion/styled';
import { Box, Button, Container, Stack } from '@mui/material';
import { Navigate } from 'react-router';
import { Alert } from 'components/atoms/notifications/alert';
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

/**
 * パスワード変更ページ
 */
const ChangePassword: VFC = () => {
  const [control, handleSubmit, handleLogin, httpResponse] =
    useChangePassword();

  if (httpResponse && httpResponse.result === 'success') {
    return <Navigate to="/login?changePassword=" />;
  }

  return (
    <>
      <SContainer maxWidth="sm">
        <SBox>
          <PageTitle title="パスワード設定" />
          <Alert
            severity={httpResponse?.result}
            message={httpResponse?.message}
          />

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
                errors={httpResponse?.errors}
              />
              <RhfPasswordField
                id="confirm-password"
                name="confirmPassword"
                label="パスワード(確認用)"
                showStartIcon
                showEndIcon
                control={control}
                errors={httpResponse?.errors}
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
