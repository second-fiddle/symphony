import { VFC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from 'hooks/auth/useAuth';

/**
 * 認証済みルーティング定義
 */
const ProtectedRoutes: VFC = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
