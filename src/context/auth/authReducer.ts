import { AuthTypes, initialState } from './AuthState';
import {
  AUTH_CHECK_WALLET,
  AUTH_LOGIN_USER,
  AUTH_LOG_OUT_USER,
  AUTH_REGISTER_USER,
} from 'context/types';

const authReducer = (
  state: AuthTypes,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case AUTH_REGISTER_USER:
    case AUTH_LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    case AUTH_LOG_OUT_USER:
      return initialState;
    case AUTH_CHECK_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
