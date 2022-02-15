import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const SBackDiv = styled('div')`
  text-align: left;
  margin-top: 20px;
`;

/**
 * ログイン画面に戻る
 * @returns DOM
 */
const BackLogin = () => (
  <SBackDiv>
    <Link to="/login" className="item">
      ログイン画面へ
    </Link>
  </SBackDiv>
);

export { BackLogin };
