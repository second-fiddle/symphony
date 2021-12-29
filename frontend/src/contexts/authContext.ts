import { createContext } from 'react';
import { User } from 'models/user';

interface AuthContextType {
  token?: string;
  user?: User;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

/**
 * ログイン状態を管理するコンテキスト
 */
const AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
