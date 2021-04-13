import React from 'react';
import zaglushka from '../BooksList/zaglushka'

function InfoBook(props) {
  console.log(zaglushka);
  const book = zaglushka[0]
  return (
    <div className='background'>
      <div className='bookWindow'>
        <img src={`.${book.image}`} alt='book' />
        <div className='bookInfo'>
          <h4 className='titleBook' >{book.title}</h4>
          <h5 className='authorBook' >{book.author}</h5>
          <div className='summaryBook' >Информация о книге</div>
        </div>
      </div>
      <div className='buttonList'>
        <button className='button buttonBook' >Купить</button>
        <button className='button buttonBook' >Пробный кусочек</button>
      </div>
    </div>
  );
}

export default InfoBook;
