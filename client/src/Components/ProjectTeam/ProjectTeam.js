import React from 'react'
import './ProjectTeam.scss'

function ProjectTeam(props) {
  return (
    <div className="background flex_center flex_column  pt-4 ">
      <h3  className="color_dark">Наша команда</h3>
      <div className='flex'>
        <div className="flex_center flex_column team-card">
          <img className='imgDev mt-3' src='./images/devs/nika.jpeg' alt='Nika' />
          <div className='nameDev'>Ника</div>
          <a href='https://tlgg.ru/@nikitoi95'><button className='button buttonBook mr-1 ml-1 mt-3 team-btn'>Предложить оффер</button></a>
        </div>
        <div className="flex_center flex_column team-card">
          <img  className='imgDev mt-3'src='./images/devs/azizbek.jpeg' alt='Aziz' />
          <div className='nameDev'>Азиз</div>
          <a href='https://tlgg.ru/@Azizbek_Baltaev'><button className='button buttonBook mr-1 ml-1 mt-3 team-btn'>Предложить оффер</button></a>
        </div>
        <div className="flex_center flex_column team-card">
          <img className='imgDev mt-3' src='./images/devs/alex.jpeg' alt='Alex' />
          <div className='nameDev'>Лёша</div>
          <a href='https://tlgg.ru/@Kuji_Ninja'><button className='button buttonBook mr-1 ml-1 mt-3 team-btn'>Предложить оффер</button></a>
        </div>
        <div className="flex_center flex_column team-card">
          <img className='imgDev mt-3' src='./images/devs/egor.jpeg' alt='Egor' />
          <div className='nameDev'>Егор</div>
          <a href='https://tlgg.ru/@Egorfing'><button className='button buttonBook mr-1 ml-1 mt-3 team-btn'>Предложить оффер</button></a>
        </div>
      </div>
    </div>
  );
}

export default ProjectTeam;
