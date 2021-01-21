import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { ROUTES } from '../../constants/routes';
import './header.scss';

export default function Header() {
  const { onLogout } = useAuth();
  const history = useHistory();

  const onLogoutClickHandler = () => {
    history.replace(ROUTES.home);
    onLogout();
  };

  return (
    <header className="Header">
      <div className="Header__toolbar">
        <Link to={ROUTES.home}>My Notes</Link>
        <button onClick={onLogoutClickHandler}>Logout</button>
      </div>
    </header>
  );
}
