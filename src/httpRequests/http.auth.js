import axios from "axios";
import jwtDecode from "jwt-decode";

// Set Axios base URL
axios.defaults.baseURL = process.env.NODE_ENV === 'development'
? 'http://localhost:5000/projectmania'
: 'http://tomrossner.dev/projectmania';

const token = 'token'; // For LocalStorage
setTokenHeader(); // Set Token header on load

// Save JWT in LocalStorage
export function saveJWT(token) {
    return localStorage.setItem("token", token);
}

// Login user
export async function loginUser(values) {
    return await axios.post(`/auth/sign-in`, values);
}

// Register user
export async function registerUser(values) {
    const {first_name, last_name, email, password} = values; // Excluding confirmedPassword
    return await axios.post(`/auth/sign-up`, {first_name, last_name, email, password});
}

// Get user details
export async function getUserInfo(id) {
    return await axios.get(`/auth/get/${id}`);
}

// Update user
export async function updateUser(user) {
    return await axios.put('/auth/update', {user});
}

// Update user's profile image
export async function updateProfilePicture(values) {
    return await axios.post('/auth/update-profile-picture', values);
}

// Get JWT from LocalStorage
export function getJWT() {
    return localStorage.getItem(token);
}

// Set Token header with JWT stored in LocalStorage
export function setTokenHeader() {
    return setCommonHeader('x-auth-token', getJWT());
}

// Set Axios common header
export function setCommonHeader(headerName, value) {
    return axios.defaults.headers.common[headerName] = value;
}

// Get decoded user JWT stored in LocalStorage
export function getUser() {
    try {
        return jwtDecode(getJWT());
    } catch {
        return null;
    }
}

// Remove JWT from LocalStorage
export function LS_logout() {
    localStorage.removeItem(token);
    setTokenHeader();
}