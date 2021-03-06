import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import './InfoBook.scss'
import { useAuth } from '../../context/AuthContext';

function InfoBook(props) {
  const params = useParams()
  const {currentUser} = useAuth()
  const [book, setBook] = useState(null)
  const history = useHistory()

  useEffect(() => {
    firebase.firestore()
      .collection('books')
      .doc(params.id)
      .get()
      .then(book1 => {
        if (book1.exists)
          setBook([book1.data(), book1.id])
      })

  }, [setBook])

  return (
    <div className='background flex_center flex_column'>
      <div className='bookWindow flex coverBig'>
        <div className="mr-3">
          <img className='imgCover' src={book && book[0].cover} alt={book?.title} />
        </div>
        <div className="bookInfo-box">
          <div className='bookInfo'>
            <h3 className='color_dark titleBook' >{book && book[0].title}</h3>
            <h5 className='color_dark authorBook' >{book && book[0].bookauthor}</h5>
            <div className='summaryBook color_dark mt-5' >{book && book[0].description}</div>
          </div>
        </div>
      </div>
      <div className='buttonList'>
        <Link to={`/books/${book && book[1]}/buy`}><button className='button buttonBook butlist mr-3' >Купить за {book && book[0].price} &#8381;</button></Link>
        <Link to={`/books/${book && book[1]}/read`}><button className='button buttonBook butlist' >Ознакомительная версия</button></Link>
      </div>
    </div>
  );
}

export default InfoBook;
