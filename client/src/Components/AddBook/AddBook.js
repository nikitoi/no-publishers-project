import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import firebase from 'firebase';
import './AddBook.scss'

function AddBook(props) {

  const { uploadBook, currentUser } = useAuth();
  const [url, setUrl] = useState('')

  function saveFile(e) {
    e.preventDefault()
    // console.log(e.target.file.files[0]);

    let pdfBack

    const title = e.target.title.value
    const description = e.target.description.value
    const imgFile = e.target.image.files[0]
    // const backFilename = pdfBack
    const price = e.target.price.value
    const pages = [1, 5]

    const uploadTask = firebase.storage().ref(`books/${imgFile.name}`).put(imgFile);

    uploadTask.on(
      "state_changed",
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        console.log('url vnizu')
        firebase.storage()
          .ref("books")
          .child(imgFile.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            // post image inside db
            firebase.firestore().collection("posts").add({
              imageUrl: url,
              username: currentUser.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      }
    );

    // let formData = new FormData()
    // formData.append('file', e.target.file.files[0])

    // fetch('http://localhost:4000/testupl', {
    //   method: 'POST',
    //   // headers: { 'Content-Type' : 'multipart/form-data' },
    //   body: formData
    // })
    //   .then(res => res.json())
    //   .then(data => pdfBack = data)


console.log(url);
    console.log(title, description, imgFile, price);


  }

  function pickImg() {
    document.querySelector('#img-input')?.click()
  }

  function pickFile() {
    document.querySelector('#file')?.click()
  }

  function showRules() {

  }


  return (
    <div className='background  flex_center'>
      <form className='formAddBook modal_form' encType="multipart/form-data" method="post" action="/testupl" onSubmit={(e) => saveFile(e)}>
        <input className='auth input mb-1 wide-input' name='title' type='text' required placeholder='Название книги' />
        <textarea className='auth input mb-1 input-textarea wide-input' name='description' required type='text' placeholder='Описание' ></textarea>

        <div className="flex_center add-book_add-file wide-input">
          <label htmlFor="file-input" className="color_dark mb-1 add-book_label">Выберите фото</label>
          <input id="img-input" className="file_input" style={{ display: "none" }} type="file" required name="image" />
          <input type="button" className="file_input input mb-1" id="loadFileXml" value="img" onClick={pickImg} />
        </div>

        {/* <div className="flex_center add-book_add-file wide-input">
          <label htmlFor="file-input" className="color_dark mb-1 add-book_label">Выберите файл</label>
          <input id="file" className="file_input" style={{display: "none"}} type="file" name="upload" accept="application/pdf" />
          <input type="button" className="file_input input mb-1" id="loadFileXml" value=".pdf" onClick={pickFile} />
        </div> */}

        <input className='auth input mb-1 wide-input' name='price' type='number' required placeholder='Укажите ценник' />
        <div className="flex_column add-book_add-file wide-input">
          <button className="button wide-input text-center" onClick={showRules}>Ознакомьтесь с правилами нашей площадки</button>
          <div className="flex_center checkbox-box">
            <input id="checkbox-id" type="checkbox" className="checkbox" required />
            <label htmlFor="checkbox-id" className="color_dark checkbox-title">Ознакомлен/а </label>
          </div>
        </div>
        <input className="button wide-input" type="submit" value="Опубликовать" />
      </form>
      <div className="popup">
        <h4>Правила публикации</h4>
        <p>Мы не несем ответственности ни за что</p>
        <img src={url} alt='img'/>
      </div>
    </div>
  );
}

export default AddBook;
