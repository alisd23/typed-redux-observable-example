import React, { FunctionComponent } from 'react';
import logo from '../../logo.svg';

import './Header.css';

const Header: FunctionComponent = () =>(
  <header className="header">
    <img src={logo} className="header-logo" alt="logo" />
  </header>
);

export default Header;
