

function SignUp(props) {
  return (
    <div>
       <div className='background flex_center'>
        <div className='modal_form'>
          {/* <button className='button button-icon'></button> */}
          <div className="color_dark mb-1 font-12">Введите свои данные</div>
          <input className='auth input mb-1' type='email' name='email' placeholder='Email'/>
          <input className='auth input mb-1' type='password' name='password' placeholder='Password'/>
          <input className='auth input mb-1' type='text' name='phone' placeholder='Phone number'/>
          <button className='button button-entrance mb-1'>Регистрация</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
