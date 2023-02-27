import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../httpRequests/auth';
import { setUser } from '../store/user/user.actions';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refreshUser = () => dispatch(setUser(getUser));

    useEffect(() => {
      const logoutUser = async () => {
        logout();
        refreshUser();
      }

      logoutUser();
      navigate("/login");
    }, [])

  return null;
}

export default Logout;