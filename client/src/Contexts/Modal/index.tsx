import { useMemo, createContext, type ReactNode, type FC, useReducer } from 'react';
import modalReducer, { initialState } from './modalReducer';
import { TAuthModal, TModalContext, TRoleModal, TEnterCodeModal } from './types';

export const ModalContext = createContext<TModalContext>({
  ...initialState,
  setRoleModal: () => {},
  setEnterCodeModal: () => {},
  setAuthModal: () => {},
});

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [{ roleModal, authModal, enterCodeModal }, dispatch] = useReducer(modalReducer, initialState);

  const setRoleModal = (roleType: TRoleModal) => {
    dispatch({ type: 'SET_ROLE_MODAL', payload: { roleModal: roleType } });
  };

  const setEnterCodeModal = (enterCodeModalState: TEnterCodeModal) => {
    dispatch({ type: 'SET_ENTER_CODE_MODAL', payload: { enterCodeModal: enterCodeModalState } });
  };

  const setAuthModal = (authType: TAuthModal) => {
    dispatch({ type: 'SET_AUTH_MODAL', payload: { authModal: authType } });
  };

  const MemoizedValue = useMemo(
    () => ({
      roleModal,
      enterCodeModal,
      authModal,
      setRoleModal,
      setEnterCodeModal,
      setAuthModal,
    }),
    [roleModal, enterCodeModal, authModal, setRoleModal, setEnterCodeModal, setAuthModal]
  );

  return (
    <ModalContext.Provider value={MemoizedValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
