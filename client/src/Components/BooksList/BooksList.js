import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
// import zaglushka from './zaglushka'
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
  
  // const [id, setId] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    firebase.firestore()
      .collection('books')
      .get()
      .then((snap) => {
        snap.forEach(doc => {
          setBooks((prev) => [...prev, [doc.data(), doc.id]])
          // setId((prev) => [...prev, doc.id])
        })
      })
    }, [setBooks])
    
    return (
      <div className="background bookslist">
      <Slider {...settings}>
        {/* {console.log(id)} */}
        {books?.map(el => {
          return (
            <div className="flex_center" key={Math.random()}>
              <Link to={`/books/${el[1]}`}><img className="slider-card_img" src={el[0].cover} alt="book" /></Link>
              <h6 className="slider-card_title slider-text">{el[0].title}</h6>
              <h6 className="slider-card_author slider-text">{el[0].bookauthor}</h6>
            </div>
          )
        })}
      </Slider>
      <Slider {...settings}>
        {books?.map(el => {
          return (
            <div className="flex_center" key={Math.random()}>
              <img className="slider-card_img" src={el.cover} alt="book" />
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
