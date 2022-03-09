import { memo, FC } from 'react';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { Alert } from 'components/ui/notifications';

const SContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;
const SBox = styled(Box)`
  max-width: 370px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
`;
const SH2Title = styled('h2')`
  text-align: center;
  margin-bottom: 50px;
`;

type Props = {
  title: string;
  result?: 'error' | 'warning' | 'info' | 'success';
  message?: string;
};

/**
 * 認証ページレイアウト
 */
export const AuthenticationLayout: FC<Props> = memo((props) => {
  const { title, result, message, children } = props;

  return (
    <SContainer maxWidth="sm">
      <SBox>
        <SH2Title>{title}</SH2Title>
        <Alert severity={result} message={message} />
        {children}
      </SBox>
    </SContainer>
  );
});
