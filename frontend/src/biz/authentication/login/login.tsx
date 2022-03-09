import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import { Button, RhfEmailField, RhfPasswordField } from 'components/ui/inputs';
import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import { AuthenticationLayout } from 'biz/layouts/authentication';
import useLogin from './hooks/useLogin';

const SForm = styled('form')`
  padding: 20px 5px;
  margin: 0 auto 20px auto;
  border-bottom: solid 1px #c0c0c0;
`;

const SPasswordForgetLink = styled(Link)`
  margin-top: 40px !important;
`;

/**
 * ログインページ
 */
export const Login: VFC = memo(() => {
  const [control, handleSubmit, handleLogin, httpResponse] = useLogin();

  return (
    <AuthenticationLayout
      title="ログイン"
      result={httpResponse?.result}
      message={httpResponse?.message}
    >
      <SForm onSubmit={handleSubmit(handleLogin)}>
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
          <Button>ログイン</Button>
          <SPasswordForgetLink to="/reset-password" className="item">
            パスワードを忘れた方はこちら
          </SPasswordForgetLink>
        </Stack>
      </SForm>
      <div className="ui list right aligned basic segment">
        <Link to="/signup/tos" className="item">
          はじめての方はこちら
        </Link>
      </div>
    </AuthenticationLayout>
  );
});
