import { createContext } from 'react';
import { LoginInfo } from 'models/loginInfo';

interface AuthContextType {
  loginInfo: LoginInfo | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

/**
 * ログイン状態を管理するコンテキスト
 */
const AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
