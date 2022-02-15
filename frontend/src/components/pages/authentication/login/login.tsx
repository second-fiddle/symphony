import { VFC } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'components/pages/authentication/pageTitle';
import { RhfEmailField, RhfPasswordField } from 'components/molecules/controls';
import styled from '@emotion/styled';
import { Box, Button, Container, Stack } from '@mui/material';
import { Alert } from 'components/atoms/notifications/alert';
import useLogin from './hooks/useLogin';

const SContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;
const SBox = styled(Box)`
  max-width: 370px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
  border-bottom: solid 1px #c0c0c0;
`;
const SPasswordForgetLink = styled(Link)`
  margin-top: 40px !important;
`;

/**
 * ログインページ
 */
const Login: VFC = () => {
  const [control, handleSubmit, handleLogin, httpResponse] = useLogin();

  return (
    <>
      <SContainer maxWidth="sm">
        <SBox>
          <PageTitle title="ログイン" />
          <Alert
            severity={httpResponse?.result}
            message={httpResponse?.message}
          />

          <form onSubmit={handleSubmit(handleLogin)}>
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
              <Button type="submit" variant="contained" fullWidth>
                ログイン
              </Button>
              <SPasswordForgetLink to="/reset-password" className="item">
                パスワードを忘れた方はこちら
              </SPasswordForgetLink>
            </Stack>
          </form>
        </SBox>
        <div className="ui list right aligned basic segment">
          <Link to="/signup" className="item">
            はじめての方はこちら
          </Link>
        </div>
      </SContainer>
    </>
  );
};
export { Login };
