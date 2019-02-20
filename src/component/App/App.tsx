import React, { FunctionComponent } from 'react';

import Header from '../Header';

import './App.css';
import UserSearch from '../UserSearch';

const App: FunctionComponent = () =>(
  <div className="App">
    <Header />
    <div className="app-content">
      <UserSearch />
    </div>
  </div>
);

export default App;
