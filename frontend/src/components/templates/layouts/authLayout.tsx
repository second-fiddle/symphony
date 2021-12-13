import { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { Outlet } from 'react-router';
import { css } from '@emotion/react';

const gridStyle = css`
  height: calc(100vh - 5px);
`;
const columnStyle = css`
  max-width: 450px;
`;
const AuthLayout: FC = () => (
  <Grid textAlign="center" verticalAlign="middle" css={gridStyle}>
    <Grid.Column css={columnStyle}>
      <Outlet />
    </Grid.Column>
  </Grid>
);

export default AuthLayout;
