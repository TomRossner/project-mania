import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LS_logout, setTokenHeader } from '../httpRequests/auth';
import { fetchUserAsync, logout, setUser } from '../store/auth/auth.actions';
import { selectIsAuthenticated, selectUser } from '../store/auth/auth.selector';
import { setError, setErrorPopupOpen } from '../store/project/project.actions';
import { saveJWT } from '../httpRequests/auth';
import { provider, auth } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { getUser } from '../httpRequests/auth';
import axios from 'axios';
import { getUserInfo } from '../httpRequests/auth';

const useAuth = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);

    const login = (credentials) => dispatch(fetchUserAsync(credentials));

    const handleLogout = () => {
        dispatch(logout());
        LS_logout();
    }

    const google_signInUser = async () => {
        const {user} = await signInWithPopup(auth, provider);
        const {accessToken} = user;
        const {data} = await axios.post("/auth/sign-in/google", {googleToken: accessToken});
        const {token} = data;
        saveJWT(token);
        setTokenHeader();
        dispatch(setUser(getUser()));
        return getUser();
    }
    
    const google_signUpUser = async () => {
        const {user} = await signInWithPopup(auth, provider);
        const {accessToken, email, displayName, uid} = user;
        return await axios.post("/auth/sign-up/google", {accessToken, email, displayName, uid});
    }

    useEffect(() => { // FIX THIS
        if (!user || !isAuthenticated) {
            return setUserInfo(null);
        } else if (user && isAuthenticated) {
            const getUser = async () => {
                const {data} = await getUserInfo(user._id || user.user_id);
                return setUserInfo(data);
            }
            getUser();
        }
        
    }, [user, isAuthenticated])

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])

    return {
        isAuthenticated,
        user,
        userInfo,
        login,
        logout: handleLogout,
        googleSignIn: google_signInUser,
        googleSignUp: google_signUpUser
    }
}

export default useAuth;