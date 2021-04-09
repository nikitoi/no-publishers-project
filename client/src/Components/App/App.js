import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from '../Header/Header'
import Login from '../Login/Login'
import User from '../User/User'
import Footer from '../Footer/Footer';
import ProjectTeam from '../ProjectTeam/ProjectTeam'
import MainUp from '../MainUp/MainUp'
import MainDown from '../MainDown/MainDown'
import './App.scss'

function App(props) {
  return (
    <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <MainUp />
          <MainDown />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/projectTeam">
          <ProjectTeam />
        </Route>
      </Switch>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
