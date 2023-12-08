import './css/App.css';
import Navbar from './components/navbar';
import Showcase from './components/showase';
import Element from './components/element';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login';
import CompState from './context/compt/CompState';
import CodeEditor from './components/editor';
import eltcode from './components/eltcode'
import Profile from './components/profile';
import Creators from './components/creators';
import Users from './components/users'
const App = () => {
  return (
    <CompState>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Showcase />
          </Route>
          <Route exact path="/comp/:type" component={Element}/>
          <Route exact path="/components/:uniqueName" component={eltcode} />
          <Route exact path="/Creators">
            <Navbar />
            <Creators/>
          </Route>
          <Route exact path="/editor">
            <Navbar />
            {localStorage.getItem('auth-token') ? <CodeEditor /> : <div className="alert alert-danger my-5" role="alert"> 400 : Bad Request response</div>}
          </Route>
          <Route exact path="/login">
            <Navbar />
            {localStorage.getItem('auth-token') ? <div className="alert alert-danger my-5" role="alert"> You have all ready loged in , Reload if have any problem or Report issue </div> : <Login />}
          </Route>
          <Route exact path="/profile">
            <Navbar />
            {!localStorage.getItem('auth-token') ? <div className="alert alert-danger my-5" role="alert"> 404 , page not found, Reload if have any problem or Report issue </div> : <Profile />}
          </Route>
          <Route exact path="/user/:username" component={Users}/>
        </Switch>
      </Router>
    </CompState>
  )
}
export default App;