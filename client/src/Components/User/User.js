import React from "react";
import zaglushka from '../BooksList/zaglushka'
import { Link } from 'react-router-dom'

function User(props) {
  return (
    <div className="background">
      <div>
        <Link to ='/:id/addbook' className='button buttonBook'>Опубликовать книгу</Link>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="publishedBooks">
        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
          <h1>Опубликованные книги</h1>
          <div>
            <ul>
              <li>
                <div className="bookWindow" style={{ display: "flex", flexDirection: "row" }}>
                <img style={{maxHeight: '100px', maxWidth: '100px'}} src='https://srisovki.com/wp-content/uploads/2020/11/kisspng-bill-ci24.jpg' alt='book' />
                  <div className="bookInfo">
                    <h3 className="titleBook">Название</h3>
                    <h5 className="authorBook">Автор</h5>
                    <div className="summaryBook">Информация о книге</div>
                  </div>
                </div>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="boughtBooks">
        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
          <h1>Купленные книги</h1>
          <div>
            <ul>
              <li>
                <div className="bookWindow" style={{ display: "flex", flexDirection: "row" }}>
                <img style={{maxHeight: '100px', maxWidth: '100px'}} src='https://srisovki.com/wp-content/uploads/2020/11/kisspng-bill-ci24.jpg' alt='book' />
                  <div className="bookInfo">
                    <h3 className="titleBook">Название</h3>
                    <h5 className="authorBook">Автор</h5>
                    <div className="summaryBook">Информация о книге</div>
                  </div>
                </div>
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
