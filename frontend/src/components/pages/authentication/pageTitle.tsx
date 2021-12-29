import { VFC } from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
};

const SH2Title = styled('h2')`
  text-align: center;
  margin-bottom: 50px;
`;

/**
 * 認証画面のページタイトルを描画します。
 */
const PageTitle: VFC<Props> = ({ title }) => <SH2Title>{title}</SH2Title>;

export default PageTitle;
