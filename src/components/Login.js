import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./common/BackButton";
import Input from "./common/Input";
import {BsShieldCheck} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth/auth.actions";
import {setError, setErrorPopupOpen} from "../store/project/project.actions";
import useAuth from "../hooks/useAuth";
import { selectAuth } from "../store/auth/auth.selector";
import ButtonSpinner from "./common/ButtonSpinner";

const defaultLoginFormValues = {
    email: "",
    password: ""
}

const Login = () => {
    const [formValues, setFormValues] = useState(defaultLoginFormValues);
    const {email, password} = formValues;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {login, googleSignIn, user, isAuthenticated} = useAuth();
    const {isLoading} = useSelector(selectAuth);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            dispatch(setError("Please provide an email and a password"));
            dispatch(setErrorPopupOpen(true));
            return;
        }
        
        return login(formValues);
    }

    const resetFormValues = () => setFormValues(defaultLoginFormValues);
    
    const handleInputChange = (e) => {
       return setFormValues({...formValues,
        [e.target.name]: e.target.value ? e.target.value: formValues[e.target.name].value});
    }

    const handleGoogleSignIn = async () => {
        const user = await googleSignIn();
        dispatch(setUser(user));
    }

    useEffect(() => {
        if (user && isAuthenticated) {
            resetFormValues();
            navigate("/");
        }
    }, [user, isAuthenticated])

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
                    <button type="submit" className={isLoading ? "btn spinner form" : "btn form"}>
                        {isLoading ? <ButtonSpinner/> : <><BsShieldCheck className="icon"/>Sign in</>}
                    </button>
                    <p>OR</p>
                    <button type="button" className="btn form white" onClick={handleGoogleSignIn}><FcGoogle className="icon"/>Sign in with Google</button>
                </div>
            </div>
            <p>Not registered? <Link to="/sign-up" className="link blue">Register now</Link></p>
        </form>
    </div>
    </>
  )
}

export default Login;