import { FC } from 'react';
import PageTitle from 'biz/authentication/pageTitle';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { Button } from 'components/ui/inputs';
import { signupAgreeAtom, signupCompleteAtom } from './states/signupAtom';

const SContainer = styled(Container)`
  padding: 20px;
  text-align: center;
`;
const SBox = styled(Box)`
  max-width: 600px;
  padding: 20px 5px;
  margin: 0 auto 40px auto;
`;

const SWrapper = styled('div')`
  max-width: 370px;
  margin: 50px auto 20px auto;
`;

type PageDefine = {
  [key: string]: {
    title: string;
    back?: string;
  };
};

const pageDefines: PageDefine = {
  tos: {
    title: '利用規約',
    back: undefined,
  },
  identify: {
    title: '本人確認',
    back: 'tos',
  },
  profile: {
    title: 'プロフィール入力',
    back: 'identify',
  },
  confirm: {
    title: 'プロフィール入力確認',
    back: 'profile',
  },
  complete: {
    title: '登録完了',
    back: undefined,
  },
};

/**
 * ユーザー登録レイアウト定義
 */
const Signup: FC = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const agreed = useRecoilValue(signupAgreeAtom);
  const complete = useRecoilValue(signupCompleteAtom);
  const path = location.pathname.replace('/signup/', '');
  const pageDefine = pageDefines[path];

  if (path !== 'complete' && complete) {
    return <Navigate to="/signup/complete" />;
  }
  if (path !== 'tos' && !agreed) {
    return <Navigate to="/signup/tos" />;
  }

  const handleBack = () => {
    if (pageDefine.back) {
      navigate(`/signup/${pageDefine.back}`, { replace: true });
    }
  };

  return (
    <SContainer maxWidth="sm">
      <SBox>
        <PageTitle title={pageDefine.title} />
        <SWrapper>
          {children}
          {!!pageDefine.back && (
            <Button variant="text" onClick={handleBack}>
              戻る
            </Button>
          )}
        </SWrapper>
      </SBox>
    </SContainer>
  );
};

export { Signup };
