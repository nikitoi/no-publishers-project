import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from '../Logo/Logo'


function Header(props) {
  return (
  <nav style={{ backgroundColor : 'red'}}>
    <ul>
      <li>
        <Link to="/"><Logo /></Link>
      </li>
      <li>
        <Link to="/login">Войти</Link>
      </li>
      <li>
        <Link to="/user">Кабинет</Link>
      </li>
    </ul>
  </nav>
  )
}

export default Header;
