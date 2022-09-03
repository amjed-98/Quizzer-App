import type { TActions, TInitialState } from './types';
import { Actions } from './types';

export const initialState: TInitialState = {
  roleModal: 'CLOSED',
  authModal: undefined,
  enterCodeModal: 'CLOSED',
};

const authReducer = (state: TInitialState, { payload, type }: TActions): TInitialState => {
  switch (type) {
    case Actions.SET_ROLE_MODAL:
      return {
        ...state,
        roleModal: payload.roleModal || 'CLOSED',
      };

    case Actions.SET_AUTH_MODAL:
      return {
        ...state,
        authModal: payload.authModal || undefined,
      };

    case Actions.SET_ENTER_CODE_MODAL:
      return {
        ...state,
        enterCodeModal: payload.enterCodeModal || 'CLOSED',
      };

    default:
      return state;
  }
};

export default authReducer;
