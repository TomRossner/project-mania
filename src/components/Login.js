import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./common/BackButton";
import { loginUser } from "../httpRequests/auth";
import Input from "./common/Input";
import { ProjectContext } from "../contexts/ProjectContext";

const defaultLoginFormValues = {
    email: "",
    password: ""
}

const Login = () => {
    const [formValues, setFormValues] = useState(defaultLoginFormValues);
    const {email, password} = formValues;
    const {setErrorPopupOpen, setError} = useContext(ProjectContext);
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await loginUser(formValues);
            console.log(data);
            navigate('/project-mania-frontend')
            resetFormValues();
        } catch ({response}) {
            if ((response.data.error && response.status === 400)
            || (response.data.error && response.status === 404)) {
                setError(response.data.error);
                setErrorPopupOpen(true);
            }
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
            <p>Not registered? <Link to="/project-mania-frontend/register" className="link blue">Register now</Link></p>
        </form>
    </div>
    </>
  )
}

export default Login;