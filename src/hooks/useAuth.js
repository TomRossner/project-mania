import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LS_logout, setTokenHeader } from '../httpRequests/http.auth';
import { fetchUserAsync, logout, setUser } from '../store/auth/auth.actions';
import { selectAuth, selectIsAuthenticated, selectUser } from '../store/auth/auth.selector';
import { saveJWT } from '../httpRequests/http.auth';
import { provider, auth } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { getUser, updateUser } from '../httpRequests/http.auth';
import axios from 'axios';
import { setUserInfo } from '../store/userInfo/userInfo.actions';
import { selectUserInfo } from '../store/userInfo/userInfo.selector';
import { fetchUserInfoAsync } from '../store/userInfo/userInfo.actions';
import { setError, setErrorPopupOpen } from '../store/globalStates/globalStates.actions';

const useAuth = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const {error} = useSelector(selectAuth);
    const [profileImage, setProfileImage] = useState("");

    // Refresh user
    const refreshUser = () => dispatch(setUser(getUser()));

    // Login
    const login = (credentials) => dispatch(fetchUserAsync(credentials));

    // Logout handler
    const handleLogout = () => {
        dispatch(setUserInfo({...userInfo, online: false}));
        dispatch(logout());
        LS_logout();
    }

    // Update user info
    const updateUserInfo = async () => {
        const {data} = await updateUser(userInfo);
        // dispatch(setUserInfo(data));
    }


    /************
        GOOGLE
    *************/

    // Google sign-in 
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
    
    // Google sign-up
    const google_signUpUser = async () => {
        const {user} = await signInWithPopup(auth, provider);

        const {accessToken, email, displayName, uid, photoURL} = user;
        
        return await axios.post("/auth/sign-up/google", {accessToken, email, displayName, uid, imgUrl: photoURL});
    }





    useEffect(() => {
        if (!user || !isAuthenticated) dispatch(setUserInfo(null));
        if ((user && isAuthenticated && !userInfo)
        || (user && isAuthenticated && user.email !== userInfo?.email)) {
            dispatch(fetchUserInfoAsync(user._id || user.user_id));
        }
    }, [user, isAuthenticated, userInfo]);

    // Handle login error
    useEffect(() => {
        if (error && !user) {
            const {response: {data: {error: errorMessage}}} = error;
            dispatch(setError(errorMessage));
            dispatch(setErrorPopupOpen(true));
        }
    }, [error]);

    // Update user info
    // useEffect(() => {
    //     if (!userInfo) return;
        
    //     updateUserInfo();
    // }, [userInfo]); // CAUSES LAG

    // Update profile image
    useEffect(() => {
        if (!userInfo) return;
        if (userInfo.base64_img_data || userInfo.img_url) return setProfileImage(Buffer.from(userInfo.base64_img_data));
        if (!userInfo.base64_img_data && userInfo.img_url) return setProfileImage(userInfo.img_url.toString());
        else setProfileImage("");
    }, [userInfo]);

    return {
        isAuthenticated,
        user,
        userInfo,
        error,
        profileImage,
        setProfileImage,
        refreshUser,
        login,
        logout: handleLogout,
        googleSignIn: google_signInUser,
        googleSignUp: google_signUpUser,
    }
}

export default useAuth;