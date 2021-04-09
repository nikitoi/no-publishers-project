import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function Footer(props) {
  return (
    <nav style={{ backgroundColor : 'green'}}>
    <ul>
      <li>
        <Link to="/projectTeam">Команда проекта</Link>
      </li>
     
    </ul>
  </nav>
  );
}

export default Footer;
