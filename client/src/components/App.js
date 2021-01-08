import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
