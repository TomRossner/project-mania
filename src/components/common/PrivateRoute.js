import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({element}) => {
    const {user, isAuthenticated} = useAuth();

    return !user || !isAuthenticated ? <Navigate to='/sign-in'/> : element;
}

export default PrivateRoute;