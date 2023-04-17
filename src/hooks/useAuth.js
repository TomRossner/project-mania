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
import io from "socket.io-client";

const useAuth = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const {error} = useSelector(selectAuth);
    const [profileImage, setProfileImage] = useState("");
    const [emittedConnection, setEmittedConnection] = useState(false);

    //  const socket = io('http://localhost:5000', { 
    //     transports: ['websocket'], 
    //     allowEIO3: true
    // })

    // Refresh user
    const refreshUser = () => dispatch(setUser(getUser()));

    // Login
    const login = (credentials) => dispatch(fetchUserAsync(credentials));

    // Logout handler
    const handleLogout = async () => {
        await updateUserInfo({...userInfo, online: false});

        dispatch(logout());
        LS_logout();
    }

    // Update user info
    const updateUserInfo = async (user) => {
        const {data: updatedUserInfo} = await updateUser(user);

        return dispatch(setUserInfo(updatedUserInfo));
    }

    // Load profile image
    const loadProfileImage = () => {
        if (userInfo.base64_img_data || userInfo.img_url) return setProfileImage(Buffer.from(userInfo.base64_img_data));
        if (!userInfo.base64_img_data && userInfo.img_url) return setProfileImage(userInfo.img_url.toString());
        else setProfileImage("");
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
        refreshUser();

        return getUser();
    }
    
    // Google sign-up
    const google_signUpUser = async () => {
        const {user} = await signInWithPopup(auth, provider);

        const {accessToken, email, displayName, uid, photoURL} = user;
        
        return await axios.post("/auth/sign-up/google", {accessToken, email, displayName, uid, imgUrl: photoURL});
    }

    // Refresh user, in this case try getting the JWT from LocalStorage to connect the user
    useEffect(() => {
        refreshUser();
    }, []);

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
        setUserInfo,
        loadProfileImage
    }
}

export default useAuth;