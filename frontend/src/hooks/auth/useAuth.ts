import { useContext } from 'react';
import AuthContext from 'contexts/authContext';

/**
 * ログイン状態を管理するコンテキストを取得するフック
 */
const useAuth = () => useContext(AuthContext);

export default useAuth;
