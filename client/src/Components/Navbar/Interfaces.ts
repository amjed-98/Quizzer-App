import React, { Dispatch, MouseEvent, SetStateAction } from 'react';

interface INavbar {
  setCodeFormOpen: Dispatch<SetStateAction<boolean>>;
  setRole: Dispatch<SetStateAction<'student' | 'teacher'>>;
}
interface INavbarActions {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  space?: number;
  avatarPosition?: number;
  setDrawer: Dispatch<SetStateAction<boolean>>;
}

interface IMenuList {
  setDrawer: Dispatch<SetStateAction<boolean>>;
  toggleMenu: (e?: MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
}

export { IMenuList, INavbarActions, INavbar };
