import { memo, VFC } from 'react';
import { Button, Link, RhfEmailField } from 'components/ui/inputs';
import { Stack } from '@mui/material';
import { AuthenticationLayout } from 'biz/layouts/authentication';
import { useResetPassword } from './hooks/useResetPassword';

/**
 * パスワードの再設定ページ
 */
export const ResetPassword: VFC = memo(() => {
  const [control, handleSubmit, handleSend, httpResponse] = useResetPassword();

  return (
    <AuthenticationLayout
      title="パスワードの再設定"
      result={httpResponse?.result}
      message={httpResponse?.message}
    >
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
      <div className="tl mt4">
        <Link to="/login">ログイン画面へ</Link>
      </div>
    </AuthenticationLayout>
  );
});
