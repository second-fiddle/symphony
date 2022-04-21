import { has } from 'lodash';
import { IdentifyInfo } from '@/models/identifyInfo';
import { Member } from '@/models/member';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const agreeState = atom({
  key: 'signup.agree.state',
  default: false,
  effects: [persistAtom],
});
const identifyState = atom({
  key: 'signup.identify.state',
  default: {} as IdentifyInfo,
  effects: [persistAtom],
});
const profileState = atom({
  key: 'signup.profile.state',
  default: {} as Member,
  effects: [persistAtom],
});
const completeSate = atom({
  key: 'signpu.complete.state',
  default: false,
  effects: [persistAtom],
});

export const signupSelector = selector({
  key: 'signupSelector',
  get: ({ get }) => {
    const agree = get(agreeState);
    const identify = get(identifyState);
    const profile = get(profileState);
    const complete = get(completeSate);

    return { agree, identify, profile, complete };
  },
  set: (
    { set },
    value: {
      [key: string]: any;
    },
  ) => {
    if (has(value, 'agree')) {
      set(agreeState, value.agree);
    }
    if (has(value, 'identify')) {
      set(identifyState, value.identify);
    }
    if (has(value, 'profile')) {
      set(profileState, value.profile);
    }
    if (has(value, 'complete')) {
      set(completeSate, value.complete);
    }
  },
});
