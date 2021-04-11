import React from 'react';

function User(props) {
  return (
    <div className="background">
      <div>
        <button>Опубликовать книгу</button>
      </div>
      <div style={{display: 'flex', flexDirection: "row"}}>
        <div style={{display: 'flex', flexDirection: "column"}}>
          <h3>Опубликованные книги</h3>
          <div> 
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: "column"}}>
          <h3>Купленные книги</h3>
          <div> 
            <ul>
              <li></li>
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
