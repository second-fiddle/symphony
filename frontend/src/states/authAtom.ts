import { LoginInfo } from '@/models/loginInfo';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authAtom = atom<LoginInfo | null>({
  key: 'auth.loginInfo',
  default: null,
  effects: [persistAtom],
});
