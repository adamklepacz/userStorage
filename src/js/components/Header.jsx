import * as React from 'react';
import userLogo from '../../assets/images/user.png';
import './Header.css';

const Header = () => (
  <header className="app-header">
    <div className="app-header__logo">
      <img
        className="user-logo"
        src={userLogo}
        alt="User logo"
      /> USER STORAGE APP
    </div>
      <a
        href="https://unamo.com/"
        target="_blank"
        className="app-header__link"
        rel="noopener noreferrer"
      > www.github.com/adamklepacz
      </a>
  </header>
);

export default Header;
