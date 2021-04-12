import React from 'react'

export default function TestUpload() {

  function saveFile(e) {
    console.log(e.target.file.files[0]);

    // let myForm = document.getElementById('addPdfForm');
    // const formData = new FormData(myForm);

    // for (let [key, value] of formData.entries()) { 
    //   console.log(key, value);
    // }

    let formData = new FormData()
    formData.append('file', e.target.file.files[0])
    
    fetch('http://localhost:4000/testupl', {
      method: 'POST',
      // headers: { 'Content-Type' : 'multipart/form-data' },
      body: formData
    })
    .then(res => res.json())
    .then(data => console.log(data))
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
