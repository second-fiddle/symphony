import { ReactNode, useState } from 'react';
import AuthContext from 'contexts/authContext';
import { httpClient, HttpResponse } from 'services/https';
import { LoginInfo } from 'models/loginInfo';
import {
  clearStored,
  getStoredInfo,
  LocalStorageKey,
  setStoredInfo,
} from 'services/resources/storages/localStorage';

/**
 * ログインプロバイダー
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedInfo = getStoredInfo<LoginInfo>(LocalStorageKey.LoginInfo);
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(storedInfo);

  const signin = async (email: string, password: string): Promise<void> => {
    await httpClient.get('/sanctum/csrf-cookie');
    const response = await httpClient
      .post('/api/login', {
        json: { email, password },
      })
      .json<HttpResponse>();

    const authInfo = response.data;
    setLoginInfo(authInfo);
    setStoredInfo<LoginInfo>(LocalStorageKey.LoginInfo, authInfo);
  };

  const signout = async (): Promise<void> => {
    await httpClient.post('/api/logout');
    setLoginInfo(null);
    clearStored(LocalStorageKey.LoginInfo);
  };
  const value = { ...loginInfo, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
