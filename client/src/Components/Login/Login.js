import React, { useRef, useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../context/AuthContext';
import './Login.scss'


function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const { login } = useAuth;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      console.log(error, emailRef.current.value, passwordRef.current.value)
      history.push('/')

    } catch (error) {
      setError(error.message)
      console.log(error, emailRef.current.value, passwordRef.current.value)
      setLoading(false)
    }
  }

  return (
    <div className='background flex_center'>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className='modal_form'>
        {/* <button className='button button-icon'></button> */}
        <div className="color_dark mb-1 font-12">Введите логин и пароль</div>
        <input required ref={emailRef} className='auth input mb-1' type='email' name='email' placeholder='Email' />
        <input required ref={passwordRef} className='auth input mb-1' type='password' name='password' placeholder='Password' />
        <button disabled={loading} type='submit' className='button button-entrance mb-1'>Войти</button>
        <div className="color_dark">У вас ещё нет аккаунта? <Link className='link link_dark' to="/signUp">Зарегистрироваться</Link></div>
      </form>
    </div>

  );
}

export default Login;
