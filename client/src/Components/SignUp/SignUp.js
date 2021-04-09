

function SignUp(props) {
  return (
    <div>
       <div className='background'>
        <div className='modal_form'>
          <button className='button button-icon'></button>
          <input className='auth' type='email' name='email' placeholder='Email'/>
          <input className='auth' type='password' name='password' placeholder='Password'/>
          <input className='auth' type='text' name='phone' placeholder='Phone number'/>
          <button className='button button-entrance'>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
