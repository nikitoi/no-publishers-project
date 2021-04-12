import React from 'react';
import './MainDown.scss'
import Carousel from 'react-bootstrap/Carousel'
import zaglushka from '../BooksList/zaglushka'


function MainDown(props) {

  const carousels = []
  for (let i = 0; i < Math.floor(zaglushka.length / 3) * 3; i += 3) {
    carousels.push([zaglushka[i], zaglushka[i + 1], zaglushka[i + 2]])
  }
  console.log(carousels);

  return (
    <div className="maindown">
      <Carousel fade>
        {carousels?.map(el => {
          return (
            <Carousel.Item>
              <div className="d-block w-100 blockBooks">
              </div>
              <Carousel.Caption>
                <div className='flex' >
                  {el.map(el => {
                    return (
                      <div>
                        <img className="slider-card_img" src={el.image} alt="book" />
                        <h4 className="slider-card_title slider-text">{el.title}</h4>
                        <h5 className="slider-card_author slider-text">{el.author}</h5>
                      </div>
                    )
                  })}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  );
}

export default MainDown;
