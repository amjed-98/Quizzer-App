import React, { type FC, JSXElementConstructor, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useModal } from '../../Hooks';

type TProps = { Element: JSXElementConstructor<Record<string, never>> };

const RequireAuth:FC<TProps> = ({ Element }) => {
  const { user } = useAuth();
  const { setAuthModal } = useModal();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const isUserAuthorized = user && user.role === userRole;
  const isUserAuthorized = user;

  useEffect(() => {
    if (!isUserAuthorized) setAuthModal('login');
    navigate('/', { state: { from: pathname } });
  }, []);

  return <Element />;
};

export default RequireAuth;
