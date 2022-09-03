type TRoleModal = 'OPEN' | 'CLOSED';
type TAuthModal = 'login' | 'signup' | undefined;
type TEnterCodeModal = 'OPEN' | 'CLOSED';

type TInitialState = {
  roleModal: TRoleModal;
  enterCodeModal: TEnterCodeModal;
  authModal: TAuthModal;
};

type TModalContext = TInitialState & {
  setRoleModal: (value: TRoleModal) => void;
  setEnterCodeModal: (value: TEnterCodeModal) => void;
  setAuthModal: (value: TAuthModal) => void;
};

// eslint-disable-next-line no-shadow
export enum Actions {
  SET_ROLE_MODAL = 'SET_ROLE_MODAL',
  SET_AUTH_MODAL = 'SET_AUTH_MODAL',
  SET_ENTER_CODE_MODAL = 'SET_ENTER_CODE_MODAL',
}

type TActions = {
  type: keyof typeof Actions;
  payload: { roleModal?: TRoleModal; enterCodeModal?: TEnterCodeModal; authModal?: TAuthModal };
};

export type { TRoleModal, TAuthModal, TInitialState, TModalContext, TActions, TEnterCodeModal };
