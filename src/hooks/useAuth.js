import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LS_logout, setTokenHeader } from '../httpRequests/http.auth';
import { fetchUserAsync, logout, setUser } from '../store/auth/auth.actions';
import { selectIsAuthenticated, selectUser } from '../store/auth/auth.selector';
import { saveJWT } from '../httpRequests/http.auth';
import { provider, auth } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { getUser } from '../httpRequests/http.auth';
import axios from 'axios';
import { setUserInfo } from '../store/userInfo/userInfo.actions';
import { selectUserInfo } from '../store/userInfo/userInfo.selector';
import { fetchUserInfoAsync } from '../store/userInfo/userInfo.actions';

const useAuth = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    // const [userInfo, setUserInfo] = useState(null);

    const refreshUser = () => dispatch(setUser(getUser()));

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
        const {accessToken, email, displayName, uid, photoURL} = user;
        
        return await axios.post("/auth/sign-up/google", {accessToken, email, displayName, uid, imgUrl: photoURL});
    }

    useEffect(() => { // FIX THIS
        if (!user || !isAuthenticated) return setUserInfo(null);
        if (user && isAuthenticated && userInfo?.email === user.email) return;
        else if (user && isAuthenticated) {
            // dispatch(fetchUserInfoAsync(user._id || user.user_id));
            user._id
            ? dispatch(fetchUserInfoAsync(user._id))
            : dispatch(fetchUserInfoAsync(user.user_id));
        }
    }, [user, isAuthenticated])

    // useEffect(() => {
        // if (currentProject && user && isAuthenticated && userInfo) {
        //   const isProjectAdmin = currentProject.admins.find(admin => admin._id === user._id);
    
        //   if (isProjectAdmin) {
        //     setUserInfo({...userInfo, admin: true});
        //   } else {
        //     setUserInfo({...userInfo, admin: false});
        //   }
        // }
    //   }, [currentProject]) // THIS CAUSES INFINITE LOOP, MOVE TO COMPONENT

    return {
        isAuthenticated,
        user,
        userInfo,
        refreshUser,
        login,
        logout: handleLogout,
        googleSignIn: google_signInUser,
        googleSignUp: google_signUpUser,
    }
}

export default useAuth;