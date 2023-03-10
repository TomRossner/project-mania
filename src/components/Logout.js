import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Logout = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    useEffect(() => {
      logout();
      navigate("/sign-in");
    }, [])

  return null;
}

export default Logout;