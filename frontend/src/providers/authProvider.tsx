import { ReactNode, useState } from 'react';
import AuthContext from 'contexts/authContext';
import { User } from 'models/user';
import kyClient from 'services/https/kyClient';
import { HttpResponse } from 'services/https/HttpResponse';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const signin = async (
    email: string,
    password: string,
    callback: VoidFunction,
  ) => {
    await kyClient.get('/sanctum/csrf-cookie');
    const response = await kyClient
      .post('/api/login', { json: { email, password } })
      .json<HttpResponse>();

    const { token: authtoken, user: authUser } = response.data;
    setToken(authtoken);
    setUser(authUser);
    callback();
  };

  const signout = async (callback: VoidFunction) => {
    await kyClient.post('/api/logout');
    setUser(null);
    setToken(null);
    callback();
  };

  const value = { token, user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
