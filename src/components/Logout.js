import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {logout} = useAuth();

    useEffect(() => {
      logout();
      navigate("/sign-in");
    }, [])

  return null;
}

export default Logout;