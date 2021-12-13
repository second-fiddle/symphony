import { VFC } from 'react';
import { useNavigate } from 'react-router';
import useAuth from 'hooks/auth/useAuth';

const DashboardPage: VFC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user.email}!{' '}
      <button
        type="button"
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
};

export default DashboardPage;
