import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import './MainDown.scss'
import Carousel from 'react-bootstrap/Carousel'


function MainDown() {

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

  const carousels = []

  for (let i = 0; i < Math.floor(books.length / 3) * 3; i += 3) {
    carousels.push([books[i], books[i + 1], books[i + 2]])
  }

  return (
    <div className="maindown">
      <div className="maindown__arrow">
        <a href="#mainup"><img src="../images/down-arrow.png" className="arrow-up" alt="arrow-up" /></a>
      </div>
      <a name="maindown"></a>
        <Carousel >
          {carousels?.map((el) => {
            return (
              <Carousel.Item key={Math.random()}>
                <div className="d-block w-100 blockBooks">
                </div>
                <Carousel.Caption>
                  <div className='flex'>
                    {el.map(el => {
                      return (
                        <div key={Math.random()}>
                          <Link to={`/books/${el[1]}`}><img className="slider-card_img" src={el[0]?.cover} alt="book" /></Link>
                          <h6 className="slider-card_title slider-text">{el[0]?.title}</h6>
                          <h6 className="slider-card_author slider-text">{el[0]?.bookauthor}</h6>
                        </div>
                      )
                    })}
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        </Carousel>
    </div>
  );
}

export default MainDown;
