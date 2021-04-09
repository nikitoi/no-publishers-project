import React, { useRef } from 'react';
import { Link } from "react-router-dom"


function SignUp(props) {

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <div>
      <div className='background'>
        <form className='modal_form'>
          <button className='button button-icon'></button>
          <input required ref={emailRef} className='auth' type='email' name='email' placeholder='Email' />
          <input required ref={passwordRef} className='auth' type='password' name='password' placeholder='Password' />
          <input required ref={confirmPasswordRef} className='auth' type='text' name='phone' placeholder='Confirm password' />
          <button className='button button-entrance'>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
