import { ReactNode, useState } from 'react';
import AuthContext from 'contexts/authContext';
import ApiClient from 'services/https/apiClient';
import { HttpResponse } from 'services/https/HttpResponse';
import { LoginInfo } from 'models/loginInfo';
import {
  clearStored,
  LocalStorageKey,
  setStoredInfo,
} from 'services/resources/storages/localStorage';

/**
 * ログインプロバイダー
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null);

  const signin = async (email: string, password: string): Promise<void> => {
    await ApiClient.get('/sanctum/csrf-cookie');
    const response = await ApiClient.post('/api/login', {
      json: { email, password },
    }).json<HttpResponse>();

    const authInfo = response.data;
    setLoginInfo(authInfo);
    setStoredInfo<LoginInfo>(LocalStorageKey.LoginInfo, authInfo);
  };

  const signout = async (): Promise<void> => {
    await ApiClient.post('/api/logout');
    setLoginInfo(null);
    clearStored(LocalStorageKey.LoginInfo);
  };

  const value = { loginInfo, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
