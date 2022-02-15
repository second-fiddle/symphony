import { VFC } from 'react';
import PageTitle from 'components/pages/authentication/pageTitle';
import { RhfEmailField } from 'components/molecules/controls';
import styled from '@emotion/styled';
import { Box, Button, Container, Stack } from '@mui/material';
import { BackLogin } from 'components/molecules/authentication/backLogin';
import { Alert } from 'components/atoms/notifications/alert';
import useResetPassword from './hooks/useResetPassword';

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
 * パスワード忘れページ
 */
const ResetPassword: VFC = () => {
  const [control, handleSubmit, handleSend, httpResponse] = useResetPassword();

  return (
    <>
      <SContainer maxWidth="sm">
        <SBox>
          <PageTitle title="パスワードの再設定" />
          <Alert
            severity={httpResponse?.result}
            message={httpResponse?.message}
          />

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
              <Button type="submit" variant="contained" fullWidth>
                送信
              </Button>
            </Stack>
          </form>

          <BackLogin />
        </SBox>
      </SContainer>
    </>
  );
};
export { ResetPassword };
