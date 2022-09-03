import React, { useState } from 'react';
import { Dialog } from '../../mui';
import { useAuth, useModal } from '../../Hooks';
import Login from './Login';
import Signup from './Signup';
import { IAccessUser } from './Interfaces';

function AccessUser() {
  const {
    role, setRole
  } = useAuth();

  const { authModal, setAuthModal } = useModal();
  const [passwordsType, setPasswordsType] = useState<boolean>(true);

  return (
    <Dialog open={authModal === 'login'} onClose={() => { setAuthModal(undefined); setRole('student'); }}>
      {authModal === 'login' && (
      <Login
        passwordsType={passwordsType}
        setPasswordsType={setPasswordsType}
      />
      )}

      {authModal === 'signup' && (
      <Signup
        passwordsType={passwordsType}
        setPasswordsType={setPasswordsType}
      />
      )}
    </Dialog>
  );
}

export default AccessUser;
