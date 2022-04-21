import { memo, VFC } from 'react';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { Alert } from '@/components/ui/notifications';
import { HttpResultType } from '@/services/https/HttpResponse';

const SBox = styled(Box)`
  max-width: 370px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
`;

type Props = {
  title: string;
  result?: HttpResultType;
  message?: string;
  children: React.ReactNode;
};

/**
 * 認証ページレイアウト
 */
export const AuthenticationLayout: VFC<Props> = memo((props) => {
  const { title, result, message, children } = props;

  return (
    <Container maxWidth="sm" className="pa4 tc">
      <SBox>
        <h2 className="tc mb5">{title}</h2>
        <Alert severity={result} message={message} />
        {children}
      </SBox>
    </Container>
  );
});
