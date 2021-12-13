import { VFC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import PageTitle from 'components/molecules/authentication/pageTitle';
import { RhfEmailField, RhfPasswordField } from 'components/molecules/controls';
import { authLayoutformStyle } from 'components/templates/layouts/authLayoutFormStyle';
import styled from '@emotion/styled';
import useLogin from './hooks/useLogin';

const PasswordForgetLink = styled(Link)`
  padding-bottom: 20px !important;
`;

const Login: VFC = () => {
  const [control, handleSubmit, handleLogin, loginErrorMessage] = useLogin();

  return (
    <>
      <PageTitle title="ログイン" />
      <Form
        size="large"
        onSubmit={handleSubmit(handleLogin)}
        css={authLayoutformStyle}
      >
        <Message error visible={!!loginErrorMessage}>
          {loginErrorMessage}
        </Message>
        <Segment raised>
          <RhfEmailField
            id="email"
            name="email"
            placeholder="メールアドレス"
            label="メールアドレス"
            required
            showIcon
            control={control}
          />

          <RhfPasswordField
            id="password"
            name="password"
            placeholder="パスワード"
            label="パスワード"
            required
            showIcon
            control={control}
          />

          <Button color="teal" fluid size="large">
            ログイン
          </Button>
          <div className="ui list right aligned basic segment">
            <PasswordForgetLink to="/password-forget" className="item">
              パスワードを忘れた方はこちら
            </PasswordForgetLink>
            <Link to="/signup" className="item">
              はじめての方はこちら
            </Link>
          </div>
        </Segment>
      </Form>
    </>
  );
};
export { Login };
