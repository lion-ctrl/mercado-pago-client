import React, { useEffect, useReducer } from 'react';
import { register, checkWallet } from 'api/user';
import { login } from 'api/auth';

import authContext from './authContext';
import authReducer from './authReducer';

import {
  AUTH_REGISTER_USER,
  AUTH_LOGIN_USER,
  AUTH_LOG_OUT_USER,
  AUTH_CHECK_WALLET,
} from 'context/types';

export interface UserType {
  email: string;
  username: string;
  id: number;
}

export interface AuthTypes {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: UserType | null;
  wallet: number | null;
}
export const initialState: AuthTypes = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
  wallet: null,
};

const store = JSON.parse(
  localStorage.getItem('auth') || JSON.stringify(initialState)
);

const AuthState = ({ children }: { children: any }) => {
  const [auth, dispatch] = useReducer(authReducer, store);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  // Actions
  // login
  const loginAction = async (data: any) => {
    const res = await login(data);
    dispatch({ type: AUTH_LOGIN_USER, payload: res.data });
  };

  // register
  const registerAction = async (data: any) => {
    const res = await register(data);
    dispatch({ type: AUTH_REGISTER_USER, payload: res.data });
  };

  // logOut
  const logOutAction = () => {
    dispatch({ type: AUTH_LOG_OUT_USER });
  };

  // wallet
  const walletAction = async () => {
    try {
      const res = await checkWallet();
      dispatch({
        type: AUTH_CHECK_WALLET,
        payload: res.data.balance,
      });
    } catch (error) {
      logOutAction();
    }
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        accessToken: auth.accessToken,
        user: auth.user,
        wallet: auth.wallet,
        loginAction,
        registerAction,
        logOutAction,
        walletAction,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
