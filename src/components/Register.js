import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from './common/BackButton';
import { registerUser } from '../httpRequests/http.auth';
import Input from './common/Input';
import {FcGoogle} from "react-icons/fc";
import useAuth from '../hooks/useAuth';
import { PATTERN_TYPES, checkPattern } from '../utils/regex';
import { ERROR_MESSAGES } from '../utils/errors';
import useProject from '../hooks/useProject';

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
    const navigate = useNavigate();
    const {googleSignUp} = useAuth();
    const {showError} = useProject();

    const trimValues = (values) => {
        const trimmedValues = Object.values(values).map(val => val.trim());
        
        const entries = Object.entries(values).map(([key, value], index) => {
            return [key, trimmedValues[index]];
        });

        const trimmedFormValues = Object.fromEntries(entries);

        return trimmedFormValues;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check if one of the field is empty
        const someValueIsEmpty = Object.values(formValues).some(value => !value);

        if (someValueIsEmpty) {
            showError(ERROR_MESSAGES.FORM_FIELD_EMPTY);
            return;
        }

        // Check password against confirmed_password
        if (confirm_password !== password) {
            showError(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
            return;
        }


        // Validate inputs

        // Check password
        if (!checkPattern(PATTERN_TYPES.PASSWORD, password)) {
            showError(ERROR_MESSAGES.INVALID_PASSWORD_FORMAT);
            return;
        }
        
        // Check email
        if (!checkPattern(PATTERN_TYPES.EMAIL, email)) {
            showError(ERROR_MESSAGES.INVALID_EMAIL_FORMAT);
            return;
        }

        // Check first_name and last_name
        if (!checkPattern(PATTERN_TYPES.NAME, first_name.trim()) || !checkPattern(PATTERN_TYPES.NAME, last_name.trim())) {
            showError(ERROR_MESSAGES.INVALID_NAME_FORMAT);
            return;
        }

        // Trim values
        const values = trimValues(formValues);

        // Proceed to registration
        try {
            await registerUser(values);
            resetFormValues();
            navigate('/sign-in');
        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                showError(response.data.error);
            }
        }
    }

    const resetFormValues = () => setFormValues(defaultRegistrationFormValues);
    
    const handleInputChange = (e) => {
       return setFormValues({...formValues, [e.target.name]: e.target.value ? e.target.value: formValues[e.target.name].value});
    }

    const handleGoogleSignUp = async () => {
        try {
            await googleSignUp();
            navigate('/sign-in');
        } catch ({response}) {
            if (response.data.error && response.status === 400) {
                if (response.data.error === 'User already registered') {
                    showError(`${response.data.error}. You may log in using your Google account.`);
                    return;
                } else {
                    showError(response.data.error);
                }
            }
        }
    }

  return (
    <>
    <BackButton/>
    <div className='form-container'>
        <form onSubmit={handleFormSubmit}>
            <h2>Create an account</h2>

            <div className='form-inputs-container'>
                <Input
                    name='first_name'
                    id='first_name'
                    onChange={handleInputChange}
                    value={first_name}
                    type='text'
                    text='First name'
                    placeholderText="First name"
                />

                <Input
                    id='last_name'
                    name='last_name'
                    type="text"
                    onChange={handleInputChange}
                    value={last_name}
                    text="Last name"
                    placeholderText="Last name"
                />
                               
                <Input
                    id='email'
                    name='email'
                    type="email"
                    onChange={handleInputChange}
                    value={email}
                    text="Email"
                    placeholderText="Email"
                />
            
                <Input
                    id='password'
                    name='password'
                    type="password"
                    onChange={handleInputChange}
                    value={password}
                    text="Password"
                    placeholderText="Password"
                />
            
                <Input
                    id='confirm_password'
                    name='confirm_password'
                    type="password"
                    onChange={handleInputChange}
                    value={confirm_password}
                    text="Confirm password"
                    placeholderText="Confirm password"
                />
                
                <div className="buttons-container">
                    <button type='submit' className='btn form'>Create my account</button>
                    <p>OR</p>
                    <button type="button" className="btn form white" onClick={handleGoogleSignUp}><FcGoogle className="icon"/>Sign up with Google</button>
                </div>
            </div>
            <p>Already registered? <Link to="/sign-in" className='link blue'>Log in</Link></p>
        </form>
    </div>
    </>
  )
}

export default Register;