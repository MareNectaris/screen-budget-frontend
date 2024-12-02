import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: null,
});

export const isSignedInState = atom({
  key: 'isSignedInState',
  default: false,
});

export const firstTimeSetupRequiredState = atom({
  key: 'firstTimeSetupRequiredState',
  default: false,
});
