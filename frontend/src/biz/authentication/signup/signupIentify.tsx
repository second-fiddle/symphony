import { VFC } from 'react';
import {
  Button,
  RhfPasswordField,
  RhfPropertyCdField,
  RhfTextField,
} from 'components/ui/inputs';
import { Stack } from '@mui/material';
import { Alert } from 'components/ui/notifications';
import useIdentify from './hooks/useIdentify';
import { Signup } from './signup';

/**
 * 本人確認ページ
 */
const SignupIdentify: VFC = () => {
  const [control, handleSubmit, handleConfirm, httpResponse] = useIdentify();

  return (
    <Signup>
      <Alert severity={httpResponse?.result} message={httpResponse?.message} />
      <form onSubmit={handleSubmit(handleConfirm)}>
        <Stack spacing={2}>
          <RhfPropertyCdField
            id="property-cd"
            name="propertyCd"
            label="建物コード"
            required
            control={control}
            errors={httpResponse?.errors}
          />
          <RhfTextField
            id="room-no"
            name="roomNo"
            label="部屋番号"
            required
            control={control}
            errors={httpResponse?.errors}
          />
          <RhfPasswordField
            id="password"
            name="password"
            label="初期パスワード"
            required
            showEndIcon
            control={control}
            errors={httpResponse?.errors}
          />
          <Button>確認</Button>
        </Stack>
      </form>
    </Signup>
  );
};

export { SignupIdentify };
