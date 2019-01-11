import {
  TEST_DISPATCH
} from './types';

export const userRegister = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  }
}