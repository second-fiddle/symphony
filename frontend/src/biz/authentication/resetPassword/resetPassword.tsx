import { VFC } from 'react';
import PageTitle from 'biz/authentication/pageTitle';
import { Button, RhfEmailField } from 'components/ui/inputs';
import styled from '@emotion/styled';
import { Box, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Alert } from 'components/ui/notifications';
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

const SBackDiv = styled('div')`
  text-align: left;
  margin-top: 20px;
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
              <Button>送信</Button>
            </Stack>
          </form>

          <SBackDiv>
            <Link to="/login" className="item">
              ログイン画面へ
            </Link>
          </SBackDiv>
        </SBox>
      </SContainer>
    </>
  );
};
export { ResetPassword };
