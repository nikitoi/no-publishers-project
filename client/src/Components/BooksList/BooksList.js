import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import './BooksList.scss'


function BooksList(props) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.ceil(document.documentElement.clientWidth / 300),
    slidesToScroll: Math.ceil(document.documentElement.clientWidth / 300)
  };
  
  const [books, setBooks] = useState([])

  useEffect(() => {
    firebase.firestore()
      .collection('books')
      .get()
      .then((snap) => {
        snap.forEach(doc => {
          setBooks((prev) => [...prev, [doc.data(), doc.id]])
        })
      })
    }, [setBooks])
    
    return (
      <div className="background bookslist">
        <h3 className='h3Booklist'>Новые книги</h3>
      <Slider {...settings}>
        {[...books]?.sort((a,b)=>b[0].timestamp - a[0].timestamp).map(el => {
          return (
            <div className="flex_center" key={Math.random()}>
              <Link to={`/books/${el[1]}`}><img className="slider-card_img" src={el[0].cover} alt="book" /></Link>
              <h6 className="slider-card_title slider-text">{el[0].title}</h6>
              <h6 className="slider-card_author slider-text">{el[0].bookauthor}</h6>
            </div>
          )
        })}
      </Slider>
      <h3 className='h3Booklist'>Любимые книги наших читателей</h3>
      <Slider {...settings}>
        {[...books]?.sort((a, b) => a[0].price - b[0].price)?.map(el => {
          return (
            <div className="flex_center" key={Math.random()}>
              <Link to={`/books/${el[1]}`}><img className="slider-card_img" src={el[0].cover} alt="book" /></Link>
              <h6 className="slider-card_title slider-text">{el[0].title}</h6>
              <h6 className="slider-card_author slider-text">{el[0].bookauthor}</h6>
            </div>
          )
        })}
      </Slider>
    </div>
  );
}

export default BooksList;
