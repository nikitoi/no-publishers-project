import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import download from 'downloadjs';
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

  const [file, setFile] = useState(null)

  // useEffect(() => {
    // fetch('http://localhost:4000/read', {
    //   method: 'POST',
    //   responseType: 'blob',
    //   headers: { 'Content-Type': 'Application/json' },
    //   // headers: { 'Content-Type' : 'multipart/form-data' },
    //   body: JSON.stringify({id: book?.backFileName})
    // })
    // .then(async res => res.blob([res.data], {type: 'application/pdf'}))
    // .then(data => setFile(data))
  // }, [])

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
        {/* <PDFDownloadLink document={file} fileName={`${book && book[1]}.pdf`}> */}
        {/* <Link to={file} target="_blank" download={`${book && book[1]}.pdf`}> */}
          <button onClick={downloadPdf} className='button buttonBook butlist mr-3' >Скачать</button>
        {/* </Link> */}
        {/* </PDFDownloadLink> */}
        <Link to={`/user/pub/${book && book[1]}/read`}><button className='button buttonBook butlist' >Читать фрагмент</button></Link>
      </div>
    </div>
  );
}
export default PublishedBook;
