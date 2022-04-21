import { memo, VFC } from 'react';
import { Button, RhfPasswordField } from '@/components/ui/inputs';
import { Stack } from '@mui/material';
import { useChangePassword } from './hooks/useChangePassword';
import { AuthenticationLayout } from '@/biz/layout/authentication';

/**
 * パスワード変更ページ
 */
export const ChangePassword: VFC = memo(() => {
  const [control, handleSubmit, handleLogin, httpResponse] =
    useChangePassword();

  return (
    <AuthenticationLayout
      title="パスワード設定"
      result={httpResponse?.result}
      message={httpResponse?.message}>
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
          <Button>パスワード設定</Button>
        </Stack>
      </form>
    </AuthenticationLayout>
  );
});
