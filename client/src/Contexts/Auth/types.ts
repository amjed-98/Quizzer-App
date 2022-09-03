type TAuthModalType = null | 'login_signup' | 'role';
type TRole = 'teacher' | 'student';
type TUser = {
  role: TRole;
  userId: number;
  username: string;
  isVerified: boolean;
  bio: string;
  avatar: string;
} | null;

interface IUserInfo {
  username?: string;
  email: string;
  bio?: string;
  password: string;
  role: 'teacher' | 'student';
  avatar?: string;
}

type IAuthContext = {
  user: TUser;
  role: TRole;
  setRole: (_: TRole) => void;
  signup: (_: IUserInfo) => void;
  login: (_: IUserInfo) => void;
  logout: () => void;
  checkAuth: (_?: any) => void;
};

// eslint-disable-next-line no-shadow
export enum Actions {
  AUTHENTICATE = 'AUTHENTICATE',
  LOGOUT = 'LOGOUT',
  SET_ROLE = 'SET_ROLE',
}

type TInitialState = {
  user: TUser;
  error: string | null;
  role: TRole;
};

type TActions = {
  type: keyof typeof Actions;
  payload: { user?: TUser; error?: string; role?: TRole }
};

export type {
  TUser,
  IUserInfo,
  IAuthContext,
  TAuthModalType,
  TInitialState,
  TActions,
  TRole,
};
