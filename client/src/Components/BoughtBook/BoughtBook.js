import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import download from 'downloadjs';
import firebase from 'firebase'
import '../InfoBook/InfoBook'

function BoughtBook(props) {
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

  function downloadPdf(){

    fetch('http://localhost:4000/read', {
      method: 'POST',
      responseType: 'blob',
      headers: { 'Content-Type': 'Application/json' },
      // headers: { 'Content-Type' : 'multipart/form-data' },
      body: JSON.stringify({id: book && book[0].backFileName})
    })
    .then(async res => res.blob([res.data], {type: 'application/pdf'}))
    .then(data => download(data, `${book && book[1]}.pdf`))
    
  }


  return (
    <div className='background flex_center flex_column'>
      <div className='bookWindow flex coverBig'>
        <div className="mr-3">
          <img className='imgCover' src={book && book[0].cover} alt={book && book[0].title} />
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
        <Link to={`/user/pur/${book && book[1]}/read`}><button className='button buttonBook butlist mr-3' >Читать</button></Link>
        <button onClick={downloadPdf}  className='button buttonBook butlist' >Скачать</button>
      </div>
    </div>
  );
}

export default BoughtBook;
