import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import '../InfoBook/InfoBook'
import firebase from 'firebase'


function PublishedBook(props) {
  const params = useParams()
  console.log(params);
  const [book, setBook] = useState(null)


  useEffect(() => {
    firebase.firestore()
      .collection('books')
      .doc(params.id)
      .get()
      .then(book1 => {
        if (book1.exists)
          setBook(book1.data())
      })

  }, [setBook])

  return (
    <div className='background flex_center flex_column'>
      <div className='bookWindow flex coverBig'>
        <div className="mr-3">
          <img className='imgCover' src={book?.cover} alt={book?.title} />
        </div>
        <div className='bookInfo'>
          <h3 className='color_dark titleBook' >{book?.title}</h3>
          <h5 className='color_dark authorBook' >{book?.bookauthor}</h5>
          <div className='summaryBook color_dark mt-5' >{book?.description}</div>
        </div>
      </div>
      <div className='buttonList'>
        <button className='button buttonBook butlist mr-3' >Изменить</button>
        <button className='button buttonBook butlist' >Удалить</button>
      </div>
    </div>
  );
}
export default PublishedBook;
