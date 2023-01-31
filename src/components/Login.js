import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import { loginUser } from '../auth/auth';

const defaultLoginFormValues = {
    email: "",
    password: ""
}

const Login = () => {
    const [formValues, setFormValues] = useState(defaultLoginFormValues);
    const {email, password} = formValues;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        loginUser(formValues);
        resetFormValues();
    }

    const resetFormValues = () => setFormValues(defaultLoginFormValues);
    
    const handInputChange = (e) => {
       return setFormValues({...formValues, [e.target.name]: e.target.value ? e.target.value: formValues[e.target.name].value});
    }

  return (
    <>
    <BackButton/>
    <div className='form-container'>
        <form onSubmit={handleFormSubmit}>
            <h2>Log in</h2>

            <div className='form-inputs-container'>            

                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        type="email"
                        onChange={handInputChange}
                        value={email}
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        name='password'
                        type="password"
                        onChange={handInputChange}
                        value={password}
                    />
                </div>

                <button type='submit' className='btn'>Log in</button>
            </div>
            <p>Not registered? <Link to="/register" className='link'>Register now</Link></p>
        </form>
    </div>
    </>
  )
}

export default Login;