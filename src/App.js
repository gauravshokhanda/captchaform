import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

const SignUpForm = () => {
  const { register, handleSubmit, watch,formState: { errors } } = useForm();
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // generate a new captcha string
  const generateCaptcha = () => {
    const captchaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += captchaChars.charAt(Math.floor(Math.random() * captchaChars.length));
    }
    setCaptchaText(captcha);
  }

  // handle form submission
  const onSubmit = (data) => {
    if (captchaInput === captchaText) {
      alert(JSON.stringify(data));
    } else {
      alert('Captcha incorrect!');
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <div className="form-input">
          <label>Email</label>
          <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && errors.email.type === "required" && <span className="error">This field is required</span>}
          {errors.email && errors.email.type === "pattern" && <span className="error">Please enter a valid email address</span>}
        </div>
        <div className="form-input">
          <label>Password</label>
          <input type="password" {...register("password", { required: true, minLength: 6 })} />
          {errors.password && errors.password.type === "required" && <span className="error">This field is required</span>}
          {errors.password && errors.password.type === "minLength" && <span className="error">Password must be at least 6 characters long</span>}
        </div>
        <div className="form-input">
          <label>Confirm Password</label>
          <input type="password" {...register("confirmPassword", { required: true, validate: value => value === watch('password') })} />
          {errors.confirmPassword && errors.confirmPassword.type === "required" && <span className="error">This field is required</span>}
          {errors.confirmPassword && errors.confirmPassword.type === "validate" && <span className="error">Passwords do not match</span>}
        </div>
        <div className="captcha-container">
          <img src={`https://dummyimage.com/120x40/000/fff&text=${captchaText}`} alt="Captcha" />
          <button type="button" onClick={generateCaptcha}>New Image</button>
        </div>
        <div className="form-input">
          <label>Enter the code above:</label>
          <input type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} />
          {captchaInput !== captchaText && <span className="error">Please enter the correct code</span>}
        </div>
        <button className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
