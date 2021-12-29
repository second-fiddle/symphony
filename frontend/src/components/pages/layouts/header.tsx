import { VFC } from 'react';
import useAuth from 'hooks/auth/useAuth';
import styled from '@emotion/styled';
import { IconButton, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';

const SHeader = styled('header')`
  border-bottom: solid 1px #c0c0c0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;
`;

const Header: VFC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth
      .signout()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <SHeader>
      <div>Logo</div>
      {auth.user && (
        <Stack direction="row" spacing={1} alignItems="center">
          <div>{auth.user.lastName}</div>
          <div>
            <IconButton aria-label="logout" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </Stack>
      )}
    </SHeader>
  );
};

export default Header;
