import { VFC, memo } from 'react';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { Button } from '@/components/ui/inputs';
import { useSignup } from './hooks/useSignup';

const SWrapper = styled('div')`
  max-width: 370px;
  margin: 40px auto 20px auto;
`;

type Props = {
  message?: string;
  children: React.ReactNode;
};

/**
 * ユーザー登録レイアウト定義
 */
export const Signup: VFC<Props> = memo((props) => {
  const { children } = props;
  const [pageDefine, handleBack] = useSignup();

  return (
    <Container maxWidth="sm" className="tc pa2">
      <Box>
        <h2 className="tc">{pageDefine.title}</h2>
        <SWrapper>
          {children}
          {!!pageDefine.back && (
            <Button variant="text" onClick={handleBack}>
              戻る
            </Button>
          )}
        </SWrapper>
      </Box>
    </Container>
  );
});
