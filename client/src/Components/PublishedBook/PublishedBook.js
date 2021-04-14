import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../InfoBook/InfoBook'
import './PublishedBook.scss'
import firebase from 'firebase'


function PublishedBook(props) {
  const params = useParams()
  const [book, setBook] = useState(null)

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
    <div className='background flex_center flex_column pub_book'>
      <div className='bookWindow flex coverBig'>
        <div className="mr-3">
          <img className='imgCover' src={book && book[0].cover} alt={book && book[0].title} />
        </div>
        <div className='bookInfo'>
          <h3 className='color_dark titleBook' >{book && book[0].title}</h3>
          <h5 className='color_dark authorBook' >{book && book[0].bookauthor}</h5>
          <div className='summaryBook color_dark mt-5' >{book && book[0].description}</div>
        </div>
      </div>
      <div className='buttonList pub_book_btn_box'>
        <button className='button buttonBook butlist mr-3' >Изменить</button>
        <button className='button buttonBook butlist' >Удалить</button>
      </div>
      <div className='buttonList pub_book_btn_box'>
        <button className='button buttonBook butlist mr-3' >Скачать</button>
        <Link to={`/user/pub/${book && book[1]}/read`}><button className='button buttonBook butlist' >Читать фрагмент</button></Link>
      </div>
    </div>
  );
}
export default PublishedBook;
