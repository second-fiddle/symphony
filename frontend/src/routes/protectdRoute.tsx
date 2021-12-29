import { VFC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from 'hooks/auth/useAuth';
import {
  getStoredInfo,
  LocalStorageKey,
} from 'services/resources/storages/localStorage';
import { LoginInfo } from 'models/loginInfo';

/**
 * 認証済みルーティング定義
 */
const ProtectedRoutes: VFC = () => {
  const auth = useAuth();
  const location = useLocation();
  const loginInfo = getStoredInfo<LoginInfo>(LocalStorageKey.LoginInfo);
  if (loginInfo) {
    auth.loginInfo = loginInfo;
  }

  if (!auth.loginInfo) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
