import { memo, VFC } from 'react';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { Alert } from 'components/ui/notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import useVerify from './hooks/useVerify';

const SContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;
const SBox = styled(Box)`
  max-width: 370px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
`;

/**
 * パスワード忘れページ
 */
export const Verify: VFC = memo(() => {
  const [httpResponse] = useVerify();

  return (
    <SContainer maxWidth="sm">
      {httpResponse?.result === 'success' ? (
        <>
          <SBox sx={{ border: 'solid 1px grey', borderRadius: '10px' }}>
            <Box>
              <CheckCircleIcon fontSize="large" sx={{ color: green[300] }} />
            </Box>
            <Box mt={2} mb={1}>
              メールアドレスの確認ができました
            </Box>
          </SBox>
          <SBox sx={{ padding: '0!important' }}>
            <Link to="/login" className="item">
              ログイン画面へ
            </Link>
          </SBox>
        </>
      ) : (
        <SBox>
          <Alert
            severity={httpResponse?.result}
            message={httpResponse?.message}
          />
          <Link to="/signup/tos" className="item">
            本人確認へ
          </Link>
        </SBox>
      )}
    </SContainer>
  );
});
