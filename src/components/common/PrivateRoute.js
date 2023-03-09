import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectUser } from '../../store/auth/auth.selector';

const PrivateRoute = ({element}) => {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return !user || !isAuthenticated ? <Navigate to='/sign-in'/> : element;
}

export default PrivateRoute;