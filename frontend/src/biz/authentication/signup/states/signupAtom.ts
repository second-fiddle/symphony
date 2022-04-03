import { IdentifyInfo } from 'models/identifyInfo';
import { Member } from 'models/member';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const signupAgreeAtom = atom<boolean>({
  key: 'signup.agree',
  default: false,
  effects: [persistAtom],
});

export const signupIdentifyAtom = atom<IdentifyInfo>({
  key: 'signup.identifyInfo',
  default: {} as IdentifyInfo,
  effects: [persistAtom],
});

export const signupProfileAtom = atom<Member>({
  key: 'signup.profile',
  default: {} as Member,
  effects: [persistAtom],
});

export const signupCompleteAtom = atom<boolean>({
  key: 'signup.complete',
  default: false,
  effects: [persistAtom],
});
