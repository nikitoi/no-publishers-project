import React, { useRef } from 'react';
import { Link } from "react-router-dom"


function SignUp(props) {

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <div>
      <div className='background flex_center'>
        <form className='modal_form'>
          {/* <button className='button button-icon'></button> */}
          <div className="color_dark mb-1 font-12">Введите свои данные</div>
          <input required ref={emailRef} className='auth input mb-1' type='email' name='email' placeholder='Email' />
          <input required ref={passwordRef} className='auth input mb-1' type='password' name='password' placeholder='Password' />
          <input required ref={confirmPasswordRef} className='auth input mb-1' type='text' name='phone' placeholder='Confirm password' />
          <button className='button button-entrance mb-1'>Регистрация</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
