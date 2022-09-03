import type { TInitialState, TActions, } from './types';
import { Actions } from './types';

export const initialState: TInitialState = {
  user: null,
  error: null,
  role: 'student',
};

const authReducer = (state: TInitialState, { payload, type }: TActions): TInitialState => {
  switch (type) {
    case Actions.AUTHENTICATE:
      return {
        ...state,
        user: payload.user || null,
        error: payload.error || null,
      };

    case Actions.LOGOUT:
      return {
        ...state,
        user: null,
        error: payload.error || null,
      };

    case Actions.SET_ROLE:
      return {
        ...state,
        role: payload.role || 'student',
      };

    default:
      return state;
  }
};

export default authReducer;
