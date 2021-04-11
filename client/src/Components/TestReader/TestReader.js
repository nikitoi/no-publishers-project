import React, { useState } from 'react';
import './TestReader.scss'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import pdfFile from './sample.pdf';

export default function TestReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
          file="/assets/docs/test.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <Document className="page"
          file="/assets/docs/test.pdf"
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
