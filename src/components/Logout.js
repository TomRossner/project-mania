import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Logout = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    useEffect(() => {
        setUser(null);
        navigate("/project-mania-frontend/login");
    }, [])

  return null;
}

export default Logout;