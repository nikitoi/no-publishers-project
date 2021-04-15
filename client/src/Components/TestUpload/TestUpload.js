import React from 'react'
import {fetchAddFile} from '../../redux/reduxThunk/asyncFunc'
import { useDispatch} from 'react-redux'

export default function TestUpload() {
  const dispatch = useDispatch()

  function saveFile(e) {

    let formData = new FormData()
    formData.append('file', e.target.file.files[0])
    
    dispatch(fetchAddFile(formData))
    e.preventDefault()

  }

  return (
    <div className="background flex_center">
      <form id="addPdfForm" encType="multipart/form-data" method="post" action="/testupl" onSubmit={(e) => saveFile(e)}>
        <div className="private">Сначала выберите файл, затем нажмите Добавить</div>
        <div className="private flex-column">
          <input id="file" className="file" type="file" name="upload" accept="application/pdf" />
          <input className="button" type="submit" value="Добавить" />
        </div>
      </form>
    </div>
  )
}
