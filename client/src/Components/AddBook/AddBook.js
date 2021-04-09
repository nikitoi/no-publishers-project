import React from 'react';
import './AddBook.scss'

function AddBook(props) {
  return (
    <div className='background'>
      <form  className='formAddBook' >
        <input className='auth' name='title' type='text' placeholder='Название книги' />
        <textarea className='auth' name='summary' type='text' placeholder='Описание' ></textarea>
        {/* Загрузка файлов */}
          <div id='upload-container' >
        <img id="upload-image" src="upload_black_24dp.svg" alt='upload'/>
               <input id="file-input" type="file" name="file" multiple />
               <label for="file-input">Выберите фото</label>
          </div>
          <div id='upload-container' >
        <img id="upload-image" src="upload_black_24dp.svg" alt='upload'/>
               <input id="file-input" type="file" name="file" multiple />
               <label for="file-input">Выберите файл</label>
          </div>

          <input className='auth' name='price' type='number' placeholder='Установите цену' />
          <input />
      </form>
    </div>
  );
}

export default AddBook;
