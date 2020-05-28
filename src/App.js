import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/ui/header/Header';
import Home from './components/pages/Home'
import './App.css';
import Create from './components/pages/Create';

function App() {
  return (
    <Router>

      <Header/>

      <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path='/create'>
            <Create/>
          </Route>
          
        </Switch>
    </Router>
  );
}

export default App;
