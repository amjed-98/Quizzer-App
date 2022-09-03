import { createContext, useMemo, useReducer, type ReactNode, type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TUser, IUserInfo, IAuthContext, TRole, Actions } from './types';
import authReducer, { initialState } from './authReducer';
import { useFetch, useModal, useMutate } from '../../Hooks';

export const AuthContext = createContext<IAuthContext>({
  ...initialState,
  signup: (_:IUserInfo) => {},
  login: (_:IUserInfo) => {},
  checkAuth: (_:TUser) => {},
  logout: () => {},
  setRole: (_:TRole) => {},
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [{ user, error, role }, dispatch] = useReducer(authReducer, initialState);
  const { setRoleModal } = useModal();
  const navigateTo = useNavigate();

  const { data: userOrNull, error: checkAuthError } = useFetch<TUser>('/api/v1/auth/is-auth', [user]);
  const { mutateAsync: signupAsync, error: signupError } = useMutate<Record<'data', TUser>, IUserInfo>('POST', '/api/v1/auth/signup');
  const { mutateAsync: loginAsync, error: loginError } = useMutate<Record<'data', TUser>, IUserInfo>('POST', '/api/v1/auth/login');
  const { mutateAsync: logoutAsync, error: logoutError } = useMutate('DELETE', '/api/v1/auth/logout');

  const signup = async (userInfo: IUserInfo): Promise<void> => {
    const {
      data: { data: newUser },
    } = await signupAsync(userInfo);
    const payload = { user: newUser, error: signupError?.message || '' };

    dispatch({ type: Actions.AUTHENTICATE, payload });
    navigateTo(`/${role}`);
  };

  const login = async (userInfo: IUserInfo): Promise<void> => {
    const {
      data: { data: loggedUser },
    } = await loginAsync(userInfo);
    const payload = { user: loggedUser, error: loginError?.message || '' };

    dispatch({ type: Actions.AUTHENTICATE, payload });
    navigateTo(`/${role}`);
  };

  const checkAuth = (authorizedUser:TUser): void => {
    const payload = { user: authorizedUser, error: checkAuthError?.message || '' };

    dispatch({ type: Actions.AUTHENTICATE, payload });
  };

  const logout = async (): Promise<void> => {
    await logoutAsync(null);
    const payload = { user: null, error: logoutError?.message || '', };

    dispatch({ type: Actions.LOGOUT, payload });
    navigateTo('/');
  };

  const setRole = (pickedRole: TRole): void => {
    dispatch({ type: Actions.SET_ROLE, payload: { role: pickedRole } });
  };

  const memoizedAuth = useMemo(
    () => ({
      user,
      signup,
      login,
      logout,
      checkAuth,
      error,
      role,
      setRole,
    }),
    [user, role, error],
  );

  useEffect(() => {
    checkAuth(userOrNull || null);
  }, [userOrNull?.userId]);

  return (
    <AuthContext.Provider value={memoizedAuth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
