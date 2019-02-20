import React, { FunctionComponent } from 'react';
import logo from '../../logo.svg';

import './Header.css';

const Header: FunctionComponent = () =>(
  <header className="app-header">
    <img src={logo} className="app-header-logo" alt="logo" />
  </header>
);

export default Header;
