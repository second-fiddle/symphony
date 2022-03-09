import { memo, VFC } from 'react';
import { Link, Stack } from '@mui/material';
import { Button, CheckBox } from 'components/ui/inputs';
import { useTos } from './hooks/useTos';
import { Signup } from './signup';

/**
 * 利用規約同意ページ
 */
export const SignupTos: VFC = memo(() => {
  const appBaseUrl = process.env.REACT_APP_API_BASE_URL ?? '';
  const [agree, handleAgreeChange, handleSubmit] = useTos();

  return (
    <Signup>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <div className="tl">
            <span>こちらの</span>
            <Link href={`${appBaseUrl}tos/tos.html`} target="_blank">
              利用規約
            </Link>
            <span>をご確認の上、同意してください。</span>
          </div>
          <CheckBox
            id="agree"
            label="利用規約に同意する"
            checked={agree}
            onChange={handleAgreeChange}
          />
          <Button disabled={!agree}>同意する</Button>
        </Stack>
      </form>
    </Signup>
  );
});
