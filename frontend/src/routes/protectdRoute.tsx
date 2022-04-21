import { VFC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import { authAtom } from '@/states/authAtom';

/**
 * 認証済みルーティング定義
 */
const ProtectedRoutes: VFC = () => {
  const [loginInfo] = useRecoilState(authAtom);
  const location = useLocation();

  if (!loginInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
