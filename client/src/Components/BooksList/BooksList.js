import React from 'react';
import zaglushka from './zaglushka'

console.log(zaglushka);


function BooksList(props) {
  return (
    <div className="background">
      {zaglushka.map(el => {
        return (
          <div>
            <img src={el.image} alt="book" />
            <h4>el.title</h4>
            <h5>el.author</h5>
          </div>
        )
      })}
    </div>
  );
}

export default BooksList;
