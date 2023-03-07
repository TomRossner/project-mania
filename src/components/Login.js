import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./common/BackButton";
import { getUser, loginUser } from "../httpRequests/auth";
import Input from "./common/Input";
import { signInUser } from "../firebase/config";
import {BsShieldCheck} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user/user.actions";
import {setError, setErrorPopupOpen} from "../store/project/project.actions"

const defaultLoginFormValues = {
    email: "",
    password: ""
}

const Login = () => {
    const [formValues, setFormValues] = useState(defaultLoginFormValues);
    const {email, password} = formValues;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginUser(formValues);
            dispatch(setUser(getUser()));
            navigate("/");
            resetFormValues();
        } catch ({response}) {
            if ((response.data.error && response.status === 400)
            || (response.data.error && response.status === 404)) {
                dispatch(setError(response.data.error));
                dispatch(setErrorPopupOpen(true));
            }
        }
    }

    const resetFormValues = () => setFormValues(defaultLoginFormValues);
    
    const handleInputChange = (e) => {
       return setFormValues({...formValues,
        [e.target.name]: e.target.value ? e.target.value: formValues[e.target.name].value});
    }

    const handleGoogleSignIn = async () => {
        await signInUser();
        dispatch(setUser(getUser()));
        navigate("/");
    }

  return (
    <>
    <BackButton/>
    <div className="form-container">
        <form onSubmit={handleFormSubmit}>
            <h2>Sign in</h2>

            <div className="form-inputs-container">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                    value={email}
                    text="Email"
                    placeholderText="Email"
                />
        
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                    value={password}
                    text="Password"
                    placeholderText="Password"
                />
               
                <div className="buttons-container">
                    <button type="submit" className="btn form"><BsShieldCheck className="icon"/>Sign in</button>
                    <p>OR</p>
                    <button type="button" className="btn form white" onClick={handleGoogleSignIn}><FcGoogle className="icon"/>Sign in with Google</button>
                </div>
            </div>
            <p>Not registered? <Link to="/register" className="link blue">Register now</Link></p>
        </form>
    </div>
    </>
  )
}

export default Login;