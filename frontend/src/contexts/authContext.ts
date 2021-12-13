import { createContext } from 'react';
import { User } from 'models/user';

interface AuthContextType {
  token: string | null;
  user: User | null;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
