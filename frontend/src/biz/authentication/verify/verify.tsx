import { memo, VFC } from 'react';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { useVerify } from './hooks/useVerify';
import { VerifySuccess } from './verifySuccess';
import { VerifyFail } from './verifyFail';

const SBox = styled(Box)`
  max-width: 370px;
  margin: 20px auto;
`;

/**
 * パスワード忘れページ
 */
export const Verify: VFC = memo(() => {
  const [httpResponse] = useVerify();

  return (
    <Container maxWidth="sm" className="pa3 tc">
      <SBox>
        {httpResponse?.result === 'success' ? (
          <VerifySuccess />
        ) : (
          <VerifyFail
            result={httpResponse?.result}
            message={httpResponse?.message}
          />
        )}
      </SBox>
    </Container>
  );
});
