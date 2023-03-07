import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getJWT, saveJWT } from "../httpRequests/auth";
import { getUser } from "../httpRequests/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCzHWnlFjJOsfMh0xabylPxg_Wy-zZwvA8",
    authDomain: "projectmania-e73ae.firebaseapp.com",
    projectId: "projectmania-e73ae",
    storageBucket: "projectmania-e73ae.appspot.com",
    messagingSenderId: "97090738607",
    appId: "1:97090738607:web:90f69531ecea0ee2e0375a"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const signInUser = async () => {
    const {user} = await signInWithPopup(auth, provider);
    const {accessToken} = user;
    const {data} = await axios.post("/auth/sign-in/google", {googleToken: accessToken});
    const {token} = data;
    saveJWT(token);
    const JWT_user = await getUser();
    return JWT_user;
}

export const signUpUser = async () => {
    const {user} = await signInWithPopup(auth, provider);
    const {accessToken, email, displayName, uid} = user;
    const response = await axios.post("/auth/sign-up/google", {accessToken, email, displayName, uid});
    console.log(response);
    return response;
}