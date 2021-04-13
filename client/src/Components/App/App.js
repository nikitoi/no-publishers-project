import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Header from '../Header/Header'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import User from '../User/User'
import Footer from '../Footer/Footer';
import ProjectTeam from '../ProjectTeam/ProjectTeam'
import MainUp from '../MainUp/MainUp'
import MainDown from '../MainDown/MainDown'
import './App.scss'
import AddBook from '../AddBook/AddBook'
import InfoBook from "../InfoBook/InfoBook"
import Reader from '../Reader/Reader'
import TestReader from '../TestReader/TestReader'
import TestUpload from '../TestUpload/TestUpload'
import BooksList from '../BooksList/BooksList'
import { Provider } from 'react-redux'
import store from '../../redux/store'

function App() {

  const history = useHistory()
  console.log(history?.location, 'hiiiiisssss')
  return (
    <Provider store={store}>
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
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/:id/addbook">
              <AddBook />
            </Route>
            <Route path="/projectTeam">
              <ProjectTeam />
            </Route>
            <Route path="/books/:id">
              <InfoBook />
            </Route>
            <Route path="/reader">
              <Reader />
            </Route>
            <Route path="/books">
              <BooksList />
            </Route>
            <Route path="/test">
              <TestReader />
            </Route>
            <Route path="/testupl">
              <TestUpload />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
