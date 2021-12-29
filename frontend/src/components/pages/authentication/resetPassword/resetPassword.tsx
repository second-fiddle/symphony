import { VFC } from 'react';
import PageTitle from 'components/pages/authentication/pageTitle';
import { RhfEmailField } from 'components/molecules/controls';
import styled from '@emotion/styled';
import { Alert, Box, Button, Container, Stack } from '@mui/material';
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
const SAlert = styled(Alert)`
  margin-bottom: 20px;
`;

/**
 * パスワード忘れページ
 */
const ResetPassword: VFC = () => {
  const [control, handleSubmit, handleSend, submitResult] = useResetPassword();

  return (
    <>
      <SContainer maxWidth="sm">
        <SBox>
          <PageTitle title="パスワードの再設定" />
          {submitResult && (
            <SAlert variant="outlined" severity={submitResult.result}>
              {submitResult.message}
            </SAlert>
          )}

          <form onSubmit={handleSubmit(handleSend)}>
            <Stack spacing={2}>
              <RhfEmailField
                id="email"
                name="email"
                label="メールアドレス"
                required
                showStartIcon
                control={control}
              />
              <Button type="submit" variant="contained" fullWidth>
                送信
              </Button>
            </Stack>
          </form>
        </SBox>
      </SContainer>
    </>
  );
};
export { ResetPassword };
