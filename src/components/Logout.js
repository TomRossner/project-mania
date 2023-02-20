import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { logout } from '../httpRequests/auth';

const Logout = () => {
    const navigate = useNavigate();
    const {refreshUser} = useContext(UserContext);

    useEffect(() => {
      const logoutUser = async () => {
        logout();
        refreshUser();
      }

      logoutUser();
      navigate("/project-mania-frontend/login");
    }, [])

  return null;
}

export default Logout;