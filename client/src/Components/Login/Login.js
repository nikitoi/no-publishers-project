import React from 'react';
import { Link } from "react-router-dom"
import './Login.scss'


function Login(props) {
  return (
    <div className='background flex_center'>
      <div className='modal_form'>
        {/* <button className='button button-icon'></button> */}
        <div className="color_dark mb-1 font-12">Введите логин и пароль</div>
        <input className='auth input mb-1' type='email' name='email' placeholder='Email'/>
        <input className='auth input mb-1' type='password' name='password' placeholder='Password'/>
        <button className='button button-entrance mb-1'>Войти</button>
        <div className="color_dark">У вас ещё нет аккаунта? <Link className='link link_dark' to="/signUp">Зарегистрироваться</Link></div>
      </div>
    </div>
    
  );
}

export default Login;
