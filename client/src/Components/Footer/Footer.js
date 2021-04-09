import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './Footer.scss'


function Footer(props) {
  return (
    <nav className="footer">
      <ul className="footer__links">
        <li className="footer__link">
          <Link to="/projectTeam" className="footer__link link">Команда проекта</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Footer;
