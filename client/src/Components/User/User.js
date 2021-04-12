import React from "react";
import zaglushka from '../BooksList/zaglushka'
import { Link } from 'react-router-dom'
import './User.scss'

function User() {
  // const pubBook = ''
  const pubBook = [...zaglushka].splice(0, 5)

  function disabledChange() {
    document.querySelector('.btn-published').classList.toggle('disabled')
    document.querySelector('.btn-bought').classList.toggle('disabled')
    document.querySelector('.publishedBooks').classList.toggle('box-invisible')
    document.querySelector('.boughtBooks').classList.toggle('box-invisible')
  }

  return (
    <div className="background">
      <div>
        <button className='button buttonBook margin2'><Link to='/:id/addbook' className='button'>Опубликовать книгу</Link></button>
      </div>
        <div className="flex_row">
          <button onClick={disabledChange} className="btn-published button mr-3 disabled">Опубликованные книги</button>
          <button onClick={disabledChange} className="btn-bought button">Купленные книги</button>
        </div>
      <div>
        <div className="publishedBooks">
      <h4 className='h4office'>Опубликованные</h4>
          <div className="bookWindow blockBooks1 flex_center" >
            <div className="books-box">
              {pubBook.map(el => {
                return (
                  <div key={Math.random()} className='oneBook'>
                    <img className="slider-card_img" src={el.image} alt="book" />
                    <h6 className="slider-card_title slider-text">{el.title}</h6>
                    <h6 className="slider-card_author slider-text">{el.author}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="boughtBooks box-invisible">
        <h4 className='h4office'>Купленные</h4>

          <div className="bookWindow blockBooks1 flex_center" >
            <div className="books-box">
              {zaglushka.map(el => {
                return (
                  <div key={Math.random()} className='oneBook'>
                    <img className="slider-card_img" src={el.image} alt="book" />
                    <h6 className="slider-card_title slider-text">{el.title}</h6>
                    <h6 className="slider-card_author slider-text">{el.author}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>



    </div>
  );
}

export default User;
