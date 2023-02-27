import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./common/BackButton";
import { loginUser } from "../httpRequests/auth";
import Input from "./common/Input";

const defaultLoginFormValues = {
    email: "",
    password: ""
}

const Login = () => {
    const [formValues, setFormValues] = useState(defaultLoginFormValues);
    const {email, password} = formValues;
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formValues);
            navigate("/");
            resetFormValues();
        } catch (error) {
            // if ((response.data.error && response.status === 400)
            // || (response.data.error && response.status === 404)) {
            //     setError(response.data.error);
            //     setErrorPopupOpen(true);
            // }
            console.log(error);
        }
    }

    const resetFormValues = () => setFormValues(defaultLoginFormValues);
    
    const handInputChange = (e) => {
       return setFormValues({...formValues, [e.target.name]: e.target.value ? e.target.value: formValues[e.target.name].value});
    }

  return (
    <>
    <BackButton/>
    <div className="form-container">
        <form onSubmit={handleFormSubmit}>
            <h2>Log in</h2>

            <div className="form-inputs-container">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handInputChange}
                    value={email}
                    text="Email"
                />
        
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handInputChange}
                    value={password}
                    text="Password"
                />
               
                <button type="submit" className="btn">Log in</button>
            </div>
            <p>Not registered? <Link to="/register" className="link blue">Register now</Link></p>
        </form>
    </div>
    </>
  )
}

export default Login;