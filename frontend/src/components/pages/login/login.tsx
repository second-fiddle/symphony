import { VFC } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'components/molecules/authentication/pageTitle';
import { RhfEmailField, RhfPasswordField } from 'components/molecules/controls';
import styled from '@emotion/styled';
import { Alert, Box, Button, Container, Stack } from '@mui/material';
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
const SAlert = styled(Alert)`
  margin-bottom: 20px;
`;

/**
 * ログインページ
 */
const Login: VFC = () => {
  const [control, handleSubmit, handleLogin, loginErrorMessage] = useLogin();

  return (
    <>
      <SContainer maxWidth="sm">
        <SBox>
          <PageTitle title="ログイン" />
          {!!loginErrorMessage && (
            <SAlert variant="outlined" severity="error">
              {loginErrorMessage}
            </SAlert>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={2}>
              <RhfEmailField
                id="email"
                name="email"
                label="メールアドレス"
                required
                showStartIcon
                control={control}
              />
              <RhfPasswordField
                id="password"
                name="password"
                label="パスワード"
                required
                showStartIcon
                showEndIcon
                control={control}
              />
              <Button type="submit" variant="contained" fullWidth>
                ログイン
              </Button>
              <SPasswordForgetLink to="/password-forget" className="item">
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
