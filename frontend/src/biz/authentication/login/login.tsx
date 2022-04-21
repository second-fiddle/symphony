import { memo, VFC } from 'react';
import {
  Button,
  Link,
  RhfEmailField,
  RhfPasswordField,
} from '@/components/ui/inputs';
import { Stack } from '@mui/material';
import { useLogin } from './hooks/useLogin';
import { AuthenticationLayout } from '@/biz/layout/authentication';

/**
 * ログインページ
 */
export const Login: VFC = memo(() => {
  const [control, handleSubmit, handleLogin, httpResponse] = useLogin();

  return (
    <AuthenticationLayout
      title="ログイン"
      result={httpResponse?.result}
      message={httpResponse?.message}>
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
          <Link to="/reset-password">パスワードを忘れた方はこちら</Link>
        </div>
      </form>
      <div className="mt4">
        <Link to="/signup/tos">はじめての方はこちら</Link>
      </div>
    </AuthenticationLayout>
  );
});
