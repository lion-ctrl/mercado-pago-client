import { AppTypes } from './AppState';
import { APP_COLLAPSED_SIDEBAR } from 'context/types';

const authReducer = (
  state: AppTypes,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case APP_COLLAPSED_SIDEBAR:
      return {
        ...state,
        appCollapsedSidebar: !state.appCollapsedSidebar,
      };
    default:
      return state;
  }
};

export default authReducer;
