import { User } from './user';

/**
 * ログイン情報
 */
export type LoginInfo = {
  token?: string;
  user?: User;
};
