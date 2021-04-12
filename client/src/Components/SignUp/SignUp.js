import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from "react-router-dom"


function SignUp() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();

  const { signup, currentUser, saveUserDB } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return 'Passwords do not match!'
    }
    try {
      setError('')
      setLoading(true)
      const newUser = await signup(emailRef.current.value, passwordRef.current.value)
      await saveUserDB(
        newUser.user.uid, 
        emailRef.current.value.toLowerCase(),
        Date.now(),
        )
      history.push('/')
      console.log(newUser, 'newuser')
      console.log(currentUser, 'current')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='background flex_center'>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className='modal_form'>
          {/* <button className='button button-icon'></button> */}
          <div className="color_dark mb-1 font-12">Введите свои данные</div>
          <input required ref={emailRef} className='auth input mb-1' type='email' name='email' placeholder='Email' />
          <input required ref={passwordRef} className='auth input mb-1' type='password' name='password' placeholder='Password' />
          <input required ref={confirmPasswordRef} className='auth input mb-1' type='password' name='phone' placeholder='Confirm password' />
          <button disabled={loading} type='submit' className='button button-entrance mb-1'>Регистрация</button>
          <div className="color_dark">Уже есть аккаунт? <Link className='link link_dark link_dark_narrow' to="/login">Войти</Link></div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
