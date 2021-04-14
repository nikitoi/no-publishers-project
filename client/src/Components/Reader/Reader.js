import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './Reader.scss'
import { Document, Page, pdfjs } from 'react-pdf';
import { fetchGetFile } from '../../redux/reduxThunk/asyncFunc'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// import pdfFile from './sample.pdf';

export default function Reader() {

  const params = useParams()
  const [book, setBook] = useState(null)

  const dispatch = useDispatch()
  const { file } = useSelector(state => state)

  const [showFrom, setShowFrom] = useState(null);
  const [showTo, setShowTo] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  // const [file, setFile] = useState(null)

  useEffect(() => {
    
    firebase.firestore()
      .collection('books')
      .doc(params.id)
      .get()
      .then(book1 => {
        if (book1.exists)
          setBook(book1.data())
          dispatch(fetchGetFile(book1.data().backFileName))
          console.log(book1.data());
          
          setNumPages(Number(book1.data().demo[1]))
          setPageNumber(Number(book1.data().demo[0]))
          setShowFrom(Number(book1.data().demo[0]))
          setShowTo(Number(book1.data().demo[1]))
      })

  }, [])
    
  //   // fetch('http://localhost:4000/read', {
  //   //   method: 'POST',
  //   //   responseType: 'blob',
  //   //   headers: { 'Content-Type': 'Application/json' },
  //   //   // headers: { 'Content-Type' : 'multipart/form-data' },
  //   //   body: JSON.stringify({id: id})
  //   // })
  //   // .then(async res => res.blob([res.data], {type: 'application/pdf'}))
  //   // .then(data => setFile(data))

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function prev() {
    setPageNumber((prev) => {
      if (prev > showFrom) {
        return prev - 2
      } else {
        return prev
      }
    })
  }

  function next() {
    setPageNumber((prev) => {
      if (prev < showTo) {
        return prev + 2
      } else {
        return prev
      }
    })
  }

  function lastPage(pageNumber) {
    if (pageNumber < showTo) {
      return pageNumber + 1
    } else {
      return null
    }
  }

  return (
    <div className='background flex_center flex_column'>
      <div className='flex_center'>
        <button className="reader-prev reader-btn" onClick={prev}>&#8249;</button>
        <Document className="page"
          file={file}
          // onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <Document className="page"
          file={file}
          // onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={lastPage(pageNumber)} />
        </Document>
        <button className="reader-next reader-btn" onClick={next}>&#8250;</button>
      </div>
      <p className="reader__pages-count">Page{pageNumber <  showTo ? `s ${pageNumber}-${pageNumber + 1}` : ` ${pageNumber}`} of {numPages}</p>
    </div>
  );
}
