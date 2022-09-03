import { useAuth } from '../Hooks';
import './index.css';
import Router from '../Router';
import { AccessUser, Navbar, PrivateQuizForm, RoleModal } from '../Components';
import useModal from '../Hooks/useModal';

function App() {
  const { user } = useAuth();
  const { authModal } = useModal();
  return (
    <>
      <Navbar />
      <PrivateQuizForm />
      <RoleModal />
      {!user && authModal && (
        <AccessUser />
      )}

      <Router />
    </>
  );
}

export default App;
