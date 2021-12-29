import { VFC } from 'react';
import PageTitle from 'components/pages/authentication/pageTitle';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';

const SContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;
const SBox = styled(Box)`
  max-width: 370px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
  border-bottom: solid 1px #c0c0c0;
`;

/**
 * ユーザー登録ページ
 */
const SignUp: VFC = () => (
  <>
    <SContainer maxWidth="sm">
      <SBox>
        <PageTitle title="ユーザー登録" />
      </SBox>
    </SContainer>
  </>
);
export { SignUp };
