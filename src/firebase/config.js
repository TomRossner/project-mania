import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { saveJWT } from "../httpRequests/auth";

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
    const {displayName, email, photoURL, accessToken} = user;
    saveJWT(accessToken);
    return {displayName, email, photoURL, accessToken};
}