import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../InfoBook/InfoBook'
import firebase from 'firebase'
import { useAuth } from '../../context/AuthContext';


function PublishedBook(props) {
  const params = useParams()
  const { currentUser } = useAuth()
  // console.log(params);
  const [book, setBook] = useState(null)
  const history = useHistory()

  function deleteBook() {
    firebase.firestore()
      .collection('books')
      .doc(params.id)
      .delete()
      .then(req => {
        console.log(req)
        history.push('/user')
      })

    if (currentUser) {
      firebase.firestore().collection('users').doc(currentUser?.uid).update({
        uplBooks: firebase.firestore.FieldValue.arrayRemove(params.id)
      })
    }
  }

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
        <Link to={`/user/edit/${params.id}`}><button className='button buttonBook butlist mr-3' >Изменить</button></Link>
        <button onClick={deleteBook} className='button buttonBook butlist' >Удалить</button>
      </div>
    </div>
  );
}
export default PublishedBook;
