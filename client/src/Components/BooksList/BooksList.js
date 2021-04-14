import React from 'react';
import Slider from "react-slick";
import zaglushka from './zaglushka'
import './BooksList.scss'

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


function BooksList(props) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.ceil(document.documentElement.clientWidth / 300),
    slidesToScroll: Math.ceil(document.documentElement.clientWidth / 300)
  };

  return (
    <div className="background bookslist">
      <Slider {...settings}>
        {zaglushka.map(el => {
          return (
            <div className="flex_center" key={Math.random()}>
              <img className="slider-card_img" src={el.image} alt="book" />
              <h6 className="slider-card_title slider-text">{el.title}</h6>
              <h6 className="slider-card_author slider-text">{el.author}</h6>
            </div>
          )
        })}
      </Slider>
      <Slider {...settings}>
        {zaglushka.map(el => {
          return (
            <div className="flex_center" key={Math.random()}>
              <img className="slider-card_img" src={el.image} alt="book" />
              <h6 className="slider-card_title slider-text">{el.title}</h6>
              <h6 className="slider-card_author slider-text">{el.author}</h6>
            </div>
          )
        })}
      </Slider>
    </div>
  );
}

export default BooksList;
