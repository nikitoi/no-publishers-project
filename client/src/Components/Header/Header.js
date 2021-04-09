import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logo from '../Logo/Logo'
import './Header.scss'


function Header(props) {
  return (
  <nav className="header">
    <Link to="/" className="header__link"><Logo /></Link>
    <ul className="header__links">
      <li className="header__link">
        <Link to="/user" className="header__link link">Кабинет</Link>
      </li>
      <li className="header__link">
        <Link to="/login" className="header__link link">Войти</Link>
      </li>
    </ul>
  </nav>
  )
}

export default Header;
