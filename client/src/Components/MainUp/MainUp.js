import React from 'react';
import './MainUp.scss';

function MainUp(props) {
  return (
    <div className="mainup">
      <a name="mainup">
      <div className="mainup__title">
        <h1 className="mainup__title_header">стань Писателем</h1>
        <h5 className="mainup__title_text">всего в один клик</h5>
      </div>
      <div className="mainup__image">
        <img className="mainup__image_img" src="./images/typewriter.png" alt="Печатная машинка" />
      </div>
      <div className="mainup__arrow">
        <a href="#maindown"><img src="./images/down-arrow.png" className="arrow-down" alt="arrow-down" /></a>
      </div>
      </a>
    </div>
  );
}

export default MainUp;
