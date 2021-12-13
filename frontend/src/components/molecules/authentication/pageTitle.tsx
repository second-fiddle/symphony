import { VFC } from 'react';
import { Header, Image } from 'semantic-ui-react';

type props = {
  title: string;
};

/**
 * 認証画面のページタイトルを描画します。
 * @param param0
 * @returns
 */
const PageTitle: VFC<props> = ({ title }) => (
  <Header as="h2" color="teal" textAlign="center">
    <Image src="https://react.semantic-ui.com/logo.png" /> {title}
  </Header>
);

export default PageTitle;
