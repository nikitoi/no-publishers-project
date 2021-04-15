import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import './PurReader.scss'
import { Document, Page, pdfjs } from 'react-pdf';
import { fetchGetFile } from '../../redux/reduxThunk/asyncFunc'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function PurReader() {

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
          setBook([book1.data(), book1.id])
          dispatch(fetchGetFile(book1.data().backFileName))
          
          setNumPages(Number(book1.data().demo[1]))
          setPageNumber(Number(book1.data().demo[0]))
          setShowFrom(Number(book1.data().demo[0]))
          setShowTo(Number(book1.data().demo[1]))
      })

  }, [])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function prev() {
    setPageNumber((prev) => {
      if (prev > 1) {
        return prev - 2
      } else {
        return prev
      }
    })
  }

  function next() {
    setPageNumber((prev) => {
      if (prev < numPages - 1) {
        return prev + 2
      } else {
        return prev
      }
    })
  }


  function prevOne() {
    setPageNumber((prev) => {
      if (prev > 1) {
        return prev - 1
      } else {
        return prev
      }
    })
  }

  function nextOne() {
    setPageNumber((prev) => {
      if (prev < numPages) {
        return prev + 1
      } else {
        return prev
      }
    })
  }


  function lastPage(pageNumber) {
    if (pageNumber < numPages) {
      return pageNumber + 1
    } else {
      return null
    }
  }

  function disabledChange() {
    document.querySelector('.btn-one-page').classList.toggle('disabled')
    document.querySelector('.btn-two-pages').classList.toggle('disabled')
    document.querySelector('.one-page').classList.toggle('box-invisible')
    document.querySelector('.two-pages').classList.toggle('box-invisible')
  }

  return (
    <div className='background flex_center flex_column'>
      
      <div className="reader_button_box">
        <button onClick={disabledChange} className='button btn-one-page mr-4' >Показывать одну страницу</button>
        <button onClick={disabledChange} className='button btn-two-pages mr-4 disabled' >Показывать две страницы</button>
      </div>

      <div className="two-pages">
        <div className='flex_center'>
          <button className="reader-prev reader-btn" onClick={prev}>&#8249;</button>
          <Document className="page"
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>

          <Document className="page"
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={lastPage(pageNumber)} />
          </Document>
          <button className="reader-next reader-btn" onClick={next}>&#8250;</button>
        </div>
        <p className="flex_center reader__pages-count">Page{pageNumber <  numPages ? `s ${pageNumber}-${pageNumber + 1}` : ` ${pageNumber}`} of {numPages}</p>
      </div>

      <div className="one-page box-invisible">
        <div className='flex_center'>
          <button className="reader-prev reader-btn" onClick={prevOne}>&#8249;</button>
          <Document className="page"
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>

          <button className="reader-next reader-btn" onClick={nextOne}>&#8250;</button>
        </div>
        <p className="flex_center reader__pages-count">Page {pageNumber} of {numPages}</p>
      </div>
      
    </div>
  );
}
