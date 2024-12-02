import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: sessionStorage,
});

export const authState = atom({
  key: 'authState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const isSignedInState = atom({
  key: 'isSignedInState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const firstTimeSetupRequiredState = atom({
  key: 'firstTimeSetupRequiredState',
  default: false,
});

export const isReInitState = atom({
  key: 'isReInitState',
  default: true,
});
