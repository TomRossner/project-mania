import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./common/BackButton";
import { loginUser } from "../httpRequests/auth";
import Input from "./common/Input";
import { ProjectContext } from "../contexts/ProjectContext";
import { UserContext } from "../contexts/UserContext";

const defaultLoginFormValues = {
    email: "",
    password: ""
}

const Login = () => {
    const [formValues, setFormValues] = useState(defaultLoginFormValues);
    const {email, password} = formValues;
    const {setErrorPopupOpen, setError} = useContext(ProjectContext);
    const {setUser, user} = useContext(UserContext);
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data: userLoggedIn} = await loginUser(formValues);
            setUser(userLoggedIn);
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

    useEffect(() => {
        if (user) navigate("/project-mania-frontend");
    }, [user])

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