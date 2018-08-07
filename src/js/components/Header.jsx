import * as React from 'react';
import unamoLogo from '../../assets/images/unamo-logo.png';
import './Header.css';

const Header = () => (
  <header className="app-header">
    <div className="app-header__logo">
      <img
        src={unamoLogo}
        alt="Unamo logo"
      />
    </div>
      <a
        href="https://unamo.com/"
        target="_blank"
        className="app-header__link"
        rel="noopener noreferrer"
      > www.unamo.com
      </a>
  </header>
);

export default Header;
