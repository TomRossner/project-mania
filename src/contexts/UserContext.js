import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../httpRequests/auth';

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    refreshUser: () => {}
})

const UserProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(getUser());

    const refreshUser = () => setUser(getUser());

    useEffect(() => {
        if (user) navigate("/project-mania-frontend");
    }, [user])

    const value = {user, setUser, refreshUser};

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export default UserProvider;