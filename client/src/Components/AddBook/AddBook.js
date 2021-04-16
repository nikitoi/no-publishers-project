import React, { useEffect, useState, useRef } from 'react';
import { fetchAddFile } from '../../redux/reduxThunk/asyncFunc'

import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from "../../context/AuthContext";
import store from '../../redux/store'
import firebase from 'firebase';
import './AddBook.scss'
import { useHistory } from 'react-router';

function AddBook(props) {

  const dispatch = useDispatch()
  let state = useSelector(state => state)
  let backFileName = state.backFileName
  const history = useHistory()

  const { currentUser } = useAuth();
  const [url, setUrl] = useState('')

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  function saveFile(e) {

    let formData = new FormData()
    formData.append('file', e.target.file.files[0])

    let pdfBack

    e.preventDefault()

    fetch(process.env.REACT_APP_SERVER_URL+'/upl', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => pdfBack = data)
      .then(() => {


    const currStore = store.getState()
    const pdfName = currStore.backFileName

    const title = e.target.title.value
    const bookauthor = e.target.bookauthor.value
    const description = e.target.description.value
    const pages = [e.target.from.value, e.target.to.value]
    const price = e.target.price.value

    const uploadTask = firebase.storage().ref(`books/${image?.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        firebase.storage()
          .ref("books")
          .child(image?.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            // post image inside db
            firebase.firestore()
              .collection("books").add({
                title,
                bookauthor,
                description,
                cover: url,
                price,
                demo: pages,
                backFileName: pdfBack,
                caption: caption,
                author: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(book => {
                return firebase.firestore()
                  .collection('users')
                  .doc(currentUser.uid)
                  .update({ uplBooks: firebase.firestore.FieldValue.arrayUnion(book.id) })
              }).then(() => history.push('/user')).catch(err => console.log(err.message))
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );


  })

  }

  let [pdfName, setPdfName] = useState('')

  function pickImg() {
    document.querySelector('#img-input')?.click()
  }

  function pickFile() {
    document.querySelector('#file')?.click()
  }

  function setFileName(e) {
    setPdfName(e.target.files[0].name)
  }

  function setImageName(e) {
    setImage(e.target.files[0])
  }

  function showRules() {
    const popup = document.querySelector('.popup')
    popup.classList.toggle('popup_opened')
  }

  function showPageNums() {
    const pages = document.querySelector('.pages-box')
    pages.classList.toggle('hidden')
  }

  return (
    <div className='background  flex_center'>
      <div className="wrapper-white">
        
        <form className='formAddBook modal_form' encType="multipart/form-data" method="post" action="/testupl" onSubmit={(e) => saveFile(e)}>

          <input className='auth input mb-1 wide-input color-light' name='title' type='text' required placeholder='Название книги' />
          <input className='auth input mb-1 wide-input color-light' name='bookauthor' type='text' required placeholder='Автор' />
          <textarea className='auth input mb-1 input-textarea wide-input color-light' name='description' required type='text' placeholder='Описание' ></textarea>

          <div className="flex_center add-book_add-file wide-input">
            <label htmlFor="file-input" className="color_dark mb-1 add-book_label">Выберите фото</label>
            <input id="img-input" onChange={(e) => setImageName(e)} className="file_input" style={{ display: "none" }} type="file" required name="image" accept="image/*,image/jpeg" />
            <div className="color_dark mb-1 add-book_label">{image?.name}</div>
            <input type="button" className="file_input input mb-1 color-light" id="loadFileXml" value="img" onClick={pickImg} />
          </div>

          <div className="flex_center add-book_add-file wide-input">
            <label htmlFor="file-input" className="color_dark mb-1 add-book_label">Выберите файл</label>
            <input id="file" onChange={(e) => setFileName(e)} className="file_input" style={{ display: "none" }} type="file" required name="upload" accept="application/pdf" />
            <div className="color_dark mb-1 add-book_label">{pdfName}</div>
            <input type="button" className="file_input input mb-1 color-light" id="loadFileXml" value=".pdf" onClick={pickFile} />
          </div>

          <input className='auth input mb-1 wide-input color-light' name='price' type='number' required placeholder='Укажите ценник в рублях' />

          <div className="flex_center checkbox-pages flex_column">
            <div className="checkbox-box">
              <input id="checkbox-pages-id" onChange={showPageNums} type="checkbox" className="checkbox color-light" />
              <label htmlFor="checkbox-pages-id" className="color_dark checkbox-title">Добавить ознакомительную версию </label>
            </div>

            <div className="flex_center pages-box hidden">
              <label className="color_dark pages_label">Показывать страницы </label>
              <input className='auth input num-input' min='1' name='from' type='number' required placeholder='с' />
              <div className="color_dark"> - </div>
              <input className='auth input num-input' min='1' name='to' type='number' required placeholder='по' />
            </div>
          </div>

          <div className="flex_column add-book_add-file wide-input rules">
            <button type="button" className="button wide-input text-center" onClick={showRules}>Прочитайте правила нашей площадки</button>
            <div className="flex_center checkbox-box">
              <input id="checkbox-id" type="checkbox" className="checkbox color-light" required />
              <label htmlFor="checkbox-id" className="color_dark checkbox-title">Ознакомлен/а </label>
            </div>
          </div>

          <input className="button wide-input mb-2" type="submit" value="Опубликовать" />
          <progress value={progress} max="100" />

        </form>

      </div>

      <div className="popup flex_center flex_column">
        <div className="popup-background"></div>
        <textarea readOnly className="textarea">
          {`    Правила публикации
    Основные положения
    1. Исполнитель обязуется оказать Заказчику услуги, указанные в соответствующих Приложениях к Договору (далее — «Услуги»), в отношении Произведений Заказчика, а Заказчик обязуется принять и оплатить оказанные Услуги в соответствии с условиями настоящего Договора.
    2. Исполнитель при оказании Услуг вправе привлекать третьих лиц по своему усмотрению. При этом Исполнитель несет перед Заказчиком ответственность за действия таких привлеченных третьих лиц в рамках оказания Услуг, как за свои собственные действия.
    3. Заказчик обязуется, заверяет и гарантирует, что:
    • имеет соответствующие права в полном объеме, в том числе право использования, на все результаты интеллектуальной деятельности, изготавливаемые в рамках настоящего Договора согласно применимому законодательству.
    • Произведение, а также иллюстративный материал (в том числе иллюстрации, используемые в оформлении обложки Произведения, либо готовая обложка, предоставленная Заказчиком) не содержит в себе авторского материала, права на который не принадлежат Заказчику.
    • использование Произведения и/или иллюстративного материала в соответствии с положениями Договора не влечет за собой нарушения каких-либо прав и законных интересов третьих лиц.
    4. В случае получения Исполнителем каких-либо требований, претензий и/или исков в отношении Произведения и/или иллюстративного материала, используемого в рамках настоящего Договора, Заказчик обязан предоставлять Исполнителю все имеющиеся у него документы, подтверждающие права Заказчика на такое Произведение и/или иллюстративный материал, в течение 3 (трех) рабочих дней с момента получения требования Исполнителя, а также гарантирует, что любые подобные требования, претензии и/или иски со стороны третьих лиц будут разрешены Заказчиком самостоятельно (без привлечения Исполнителя), от своего имени и за свой счет, а также возместить Исполнителю все понесенные им убытки вследствие вышеуказанного.

    Ответственность Сторон. Прочие условия
    11. Исполнитель, оказывая Услуги, не несет никакой ответственности за содержание и/или оформление Произведения, включая его текст, иллюстрации и/или обложку.
    12. Не предусмотренная настоящим Договором ответственность применяется Сторонами в соответствии с действующим законодательством Российской Федерации.
    13. Стороны несут ответственность за невыполнение или ненадлежащее выполнение своих обязанностей в порядке и пределах, предусмотренных действующим законодательством Российской Федерации.
    14. Споры и разногласия между сторонами в процессе реализации Договора будут разрешаться путем переговоров.
    15. При невозможности урегулирования споров и разногласий путем переговоров, такие споры и разногласия подлежат разрешению в судебном порядке в соответствии с действующим законодательством Российской Федерации.`}
        </textarea>
        <button type="button" className="button wide-input text-center popup-close-btn" onClick={showRules}>Закрыть</button>
      </div>
    </div>
  );
}

export default AddBook;
