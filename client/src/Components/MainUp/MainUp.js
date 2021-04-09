import React from 'react';
import './MainUp.scss';

function MainUp(props) {
  return (
    <div className="mainup">
      <h1>Main Header</h1>
      <p>some text about us</p>
      <div className="mainup__image">
        <img className="mainup__image_img" src="./images/typewriter.png" alt="Печатная машинка" />
      </div>
    </div>
  );
}

export default MainUp;
