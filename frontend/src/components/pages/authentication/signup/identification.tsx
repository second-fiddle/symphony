import { VFC } from 'react';
import {
  RhfEmailField,
  RhfPasswordField,
  RhfUnionCdField,
} from 'components/molecules/controls';
import styled from '@emotion/styled';
import { Button, Stack } from '@mui/material';
import { Alert } from 'components/atoms/notifications/alert';
import { BackLogin } from 'components/molecules/authentication/backLogin';
import useIdentification from './hooks/useIdentification';

const SWrapper = styled('div')`
  max-width: 370px;
  margin: 50px auto 20px auto;
`;

/**
 * 本人確認ページ
 */
const Identification: VFC = () => {
  const [control, handleSubmit, handleConfirm, httpResponse] =
    useIdentification();

  return (
    <SWrapper>
      <Alert severity={httpResponse?.result} message={httpResponse?.message} />
      <form onSubmit={handleSubmit(handleConfirm)}>
        <Stack spacing={2}>
          <RhfUnionCdField
            id="union-id"
            name="unionCd"
            label="所属コード"
            required
            showStartIcon
            control={control}
            errors={httpResponse?.errors}
          />
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
            label="初期パスワード"
            required
            showStartIcon
            showEndIcon
            control={control}
            errors={httpResponse?.errors}
          />
          <Button type="submit" variant="contained" fullWidth>
            確認
          </Button>
        </Stack>
      </form>

      <BackLogin />
    </SWrapper>
  );
};
export { Identification };
