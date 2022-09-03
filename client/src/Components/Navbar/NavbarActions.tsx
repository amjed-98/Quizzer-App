import { useState, type MouseEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Avatar, Button, List, ListItem, Stack,
} from '../../mui';
import classes from './Navbar.module.css';
import { useAuth, useModal } from '../../Hooks';
import MenuList from './MenuList';
import { INavbarActions } from './Interfaces';

const activeStyles = ({ isActive } :{ isActive:boolean }) => (isActive ? { color: '#F9AA33' } : {});

function NavbarActions({
  direction, space, avatarPosition, setDrawer,
}:INavbarActions) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setRoleModal } = useModal();

  const toggleMenu = (e:MouseEvent<HTMLElement> | undefined) => {
    setAnchorEl(e?.currentTarget || null);
  };
  const {
    role, avatar, username = '',
  } = user || {};

  return (
    <List sx={{ marginTop: '0.5rem' }}>

      <Stack direction={direction} spacing={space} alignItems="center">
        {user && (
        <>
          <Avatar src={avatar} sx={{ order: avatarPosition }} className={classes.avatar} alt="profile-picture" onClick={toggleMenu}>{username[0].toUpperCase()}</Avatar>
          <MenuList setDrawer={setDrawer} toggleMenu={toggleMenu} anchorEl={anchorEl} />
        </>
        )}

        {pathname !== '/student/quiz/enroll' && (
          <>
            {/* student Routes */}
            {(!user || role === 'student') && (
            <>
              <ListItem sx={{ width: 'initial' }} className={classes.listItem} onClick={() => setDrawer(false)}>
                <NavLink className={classes.navLink} to="/student" end style={activeStyles}>Public Quizzes</NavLink>
              </ListItem>

              <ListItem sx={{ width: 'initial' }} className={classes.listItem} onClick={() => setDrawer(false)}>
                <NavLink className={classes.navLink} to="/student/leaderboard" end style={activeStyles}>Leaderboard</NavLink>
              </ListItem>

              <ListItem sx={{ width: 'initial' }} onClick={() => { setDrawer(false); setRoleModal('OPEN'); }}>
                <Button variant="outlined" color="secondary" sx={{ color: 'primary.main' }}>Enter Code</Button>
              </ListItem>
            </>
            )}

            {/* Teacher Route */}
            {user && role === 'teacher' && (
            <>
              <ListItem sx={{ width: 'initial' }} className={classes.listItem} onClick={() => setDrawer(false)}>
                <NavLink className={classes.navLink} to="/teacher" style={activeStyles} end>My Quizzes</NavLink>
              </ListItem>
              <ListItem sx={{ width: 'initial' }} className={classes.listItem} onClick={() => setDrawer(false)}>
                <NavLink className={classes.navLink} to="/teacher/quiz/new" style={activeStyles} end>Create Quiz</NavLink>
              </ListItem>

            </>

            )}

            {!user && (
            <ListItem sx={{ width: 'initial' }}>
              <Button onClick={() => setRoleModal('OPEN')} variant="contained" sx={{ color: 'secondary.light' }}>Log In</Button>
            </ListItem>
            )}
          </>
        )}
      </Stack>
    </List>
  );
}

NavbarActions.defaultProps = {
  direction: 'row',
  space: 0,
  avatarPosition: 1,
};

export default NavbarActions;
