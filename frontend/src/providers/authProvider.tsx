import { ReactNode, useState } from 'react';
import AuthContext from 'contexts/authContext';
import { User } from 'models/user';
import ApiClient from 'services/https/apiClient';
import { HttpResponse } from 'services/https/HttpResponse';

/**
 * ログインプロバイダー
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const signin = async (email: string, password: string): Promise<void> => {
    await ApiClient.get('/sanctum/csrf-cookie');
    const response = await ApiClient.post('/api/login', {
      json: { email, password },
    }).json<HttpResponse>();

    const { token: authtoken, user: authUser } = response.data;
    setToken(authtoken);
    setUser(authUser);
  };

  const signout = async (): Promise<void> => {
    await ApiClient.post('/api/logout');
    setUser(null);
    setToken(null);
  };

  const value = { token, user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
