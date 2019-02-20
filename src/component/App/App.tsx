import React, { FunctionComponent } from 'react';

import Header from '../Header';

import './App.css';
import UserSearch from '../UserSearch';

const App: FunctionComponent = () =>(
  <div className="App">
    <Header />
    <UserSearch />
  </div>
);

export default App;
