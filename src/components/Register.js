import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import { addNewUser } from '../auth/auth';

const defaultRegistrationFormValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
}

const Register = () => {
    const [formValues, setFormValues] = useState(defaultRegistrationFormValues);
    const {first_name, last_name, email, password, confirm_password} = formValues;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formValues.confirm_password !== formValues.password)
            return console.log("Passwords don't match");
        addNewUser(formValues);
        resetFormValues();
    }

    const resetFormValues = () => setFormValues(defaultRegistrationFormValues);
    
    const handInputChange = (e) => {
       return setFormValues({...formValues, [e.target.name]: e.target.value ? e.target.value: formValues[e.target.name].value});
    }

  return (
    <>
    <BackButton/>
    <div className='form-container'>
        <form onSubmit={handleFormSubmit}>
            <h2>Create an account</h2>

            <div className='form-inputs-container'>
                <div className='input-container'>
                    <label htmlFor='first_name'>First name</label>
                    <input
                        id='first_name'
                        name='first_name'
                        type="text"
                        onChange={handInputChange}
                        value={first_name}
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor='last_name'>Last name</label>
                    <input
                        id='last_name'
                        name='last_name'
                        type="text"
                        onChange={handInputChange}
                        value={last_name}
                    />
                </div>               

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

                <div className='input-container'>
                    <label htmlFor='confirm_password'>Confirm password</label>
                    <input
                        id='confirm_password'
                        name='confirm_password'
                        type="password"
                        onChange={handInputChange}
                        value={confirm_password}
                    />
                </div>

                <button type='submit' className='btn'>Create my account</button>
            </div>
            <p>Already registered? <Link to="/login" className='link'>Log in</Link></p>
        </form>
    </div>
    </>
  )
}

export default Register;