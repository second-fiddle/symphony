import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';
import { Button, RhfEmailField, RhfPasswordField } from 'components/ui/inputs';
import { Stack } from '@mui/material';
import { AuthenticationLayout } from 'biz/layouts/authentication';
import useLogin from './hooks/useLogin';

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
      <form onSubmit={handleSubmit(handleLogin)} className="pb4 bb b--silver">
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
        </Stack>
        <div className="mt4">
          <Link to="/reset-password" className="item">
            パスワードを忘れた方はこちら
          </Link>
        </div>
      </form>
      <div className="mt4">
        <Link to="/signup/tos" className="item">
          はじめての方はこちら
        </Link>
      </div>
    </AuthenticationLayout>
  );
});
