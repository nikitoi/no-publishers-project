import React from 'react';

function InfoBook(props) {
  return (
    <div>
    <div className='bookWindow'>
      <img src='' alt='' />
      <div className='bookInfo'>
        <h3 className='titleBook' >Название</h3>
        <h5 className='autorBook' >Автор</h5>
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
