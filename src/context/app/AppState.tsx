import React, { useEffect, useReducer } from 'react';

import appContext from './appContext';
import appReducer from './appReducer';

import { APP_COLLAPSED_SIDEBAR } from 'context/types';

export interface UserType {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  username: string;
  id: number;
}

export interface AppTypes {
  appCollapsedSidebar: boolean;
}
const initialState: AppTypes = { appCollapsedSidebar: false };

const store = JSON.parse(
  localStorage.getItem('app') || JSON.stringify(initialState)
);

const AppState = ({ children }: { children: any }) => {
  const [app, dispatch] = useReducer(appReducer, store);

  useEffect(() => {
    localStorage.setItem('app', JSON.stringify(app));
  }, [app]);

  // Actions
  const appToggleSidebarAction = () => {
    dispatch({ type: APP_COLLAPSED_SIDEBAR });
  };

  return (
    <appContext.Provider
      value={{
        appCollapsedSidebar: app.appCollapsedSidebar,
        appToggleSidebarAction,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
