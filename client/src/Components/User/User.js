import React, { useEffect, useState } from "react";
import zaglushka from '../BooksList/zaglushka'
import { Link } from 'react-router-dom'
import './User.scss'
import firebase from 'firebase'
import { useAuth } from "../../context/AuthContext";

function User() {
  // const pubBook = ''
  const [books, setBooks] = useState([])
  const [booksNum, setBooksNum] = useState(null)

  const pubBook = [...zaglushka].splice(0, 5)
  const { currentUser } = useAuth()

  function loadBooks(){
    console.log('curr user',currentUser);
    if(currentUser){
         firebase.firestore().collection('users').doc(currentUser?.uid).get().then(req => {
      setBooksNum(req.data()?.uplBooks?.length);
      console.log(req.data(), currentUser.uid);
      return (
        req.data()?.uplBooks.map(el => {
          return (
           firebase.firestore().collection('books').doc(el).get().then(req => setBooks((prev) => [...prev, req.data()]))
          )
        })
      )
    })
    }
  }

  // loadBooks()
  useEffect(() => {

      loadBooks()
      console.log('ddddddd', books);

  }, [currentUser])

  

  // console.log(books);

  function disabledChange() {
    document.querySelector('.btn-published').classList.add('disabled')
    document.querySelector('.btn-bought').classList.remove('disabled')
    document.querySelector('.publishedBooks').classList.remove('box-invisible')
    document.querySelector('.boughtBooks').classList.add('box-invisible')
  }
  function disabledChange1() {
    document.querySelector('.btn-published').classList.remove('disabled')
    document.querySelector('.btn-bought').classList.add('disabled')
    document.querySelector('.publishedBooks').classList.add('box-invisible')
    document.querySelector('.boughtBooks').classList.remove('box-invisible')
  }

  return (
    <div className="background">
      <div className="pt-3">
        <button className='button buttonBook margin2 ml-5 mb-4 mt-5'><Link to={`/${currentUser?.uid}/addbook`} className='button'>Опубликовать книгу</Link></button>
      </div>
        <div className="flex_row">
          <button onClick={disabledChange} className="btn-published button mr-3 ml-5 disabled">Опубликованные книги</button>
          <button onClick={disabledChange1} className="btn-bought button">Купленные книги</button>
        </div>
      <div>
        <div className="publishedBooks">
      <h4 className='h4office ml-5'>Опубликованные</h4>
          <div className="bookWindow blockBooks1 flex_center" >
            <div className="books-box">
              {books.length === booksNum && books.map(el => {
                console.log(el);
                return (
                  <div key={Math.random()} className='oneBook flex_center flex_column'>
                    <img className="slider-card_img" src={el.cover} alt="book" />
                    <h6 className="slider-card_title slider-text">{el.title}</h6>
                    <h6 className="slider-card_author slider-text">{el.author}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="boughtBooks box-invisible">
        <h4 className='h4office ml-5'>Купленные</h4>

          <div className="bookWindow blockBooks1 flex_center" >
            <div className="books-box">
              {zaglushka.map(el => {
                return (
                  <div key={Math.random()} className='oneBook flex_center flex_column'>
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
