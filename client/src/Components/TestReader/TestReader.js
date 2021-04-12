import React, { useState, useEffect } from 'react';
import './TestReader.scss'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import pdfFile from './sample.pdf';

export default function TestReader() {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/test', {
      method: 'POST',
      responseType: 'blob'
      // headers: { 'Content-Type' : 'multipart/form-data' },
      // body: 1
    })
    .then(async res => res.blob([res.data], {type: 'application/pdf'}))
    .then(data => setFile(data))

    // .then(async res => {
      // const file = await res.blob([res.data], {type: 'application/pdf'})
      // console.log(file);
      // await setFile(file)
      // return file
    // })

    // .then(res => {
    //   //Create a Blob from the PDF Stream
    //     const file = new Blob(
    //       [res.data],
    //       {type: 'application/pdf'})
    //     console.log(file);
    //     setFile(file)
    //   })
      // .then(data => setFile(data))
      // .catch(error => {
      //     console.log(error);
      // });
    // .then(res => res.blob())
    // .then(data => setFile(data))

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

  return (
    <div className='background flex_center flex_column'>
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
          <Page pageNumber={pageNumber + 1} />
        </Document>
        <button className="reader-next reader-btn" onClick={next}>&#8250;</button>
      </div>
      <p className="reader__pages-count">Pages {pageNumber}-{pageNumber + 1} of {numPages}</p>
    </div>
  );
}
