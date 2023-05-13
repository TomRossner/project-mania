import axios from "axios";
import jwtDecode from "jwt-decode";

// Set Axios base URL
process.env.NOVE_ENV === 'development'
? axios.defaults.baseURL = 'http://localhost:5000/projectmania'
: axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';
// axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';
console.log(process.env.NODE_ENV)
console.log(axios.defaults.baseURL)

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

    const newUser = {
        first_name,
        last_name,
        email,
        password
    };

    return await axios.post(`/auth/sign-up`, {newUser});
}

// Get user details
export async function getUserInfo(id) {
    return await axios.get(`/auth/get/${id}`);
}

// Update user details
export async function updateUser(user) {
    return await axios.put('/auth/update', user);
}

// Update user's profile image
export async function updateProfilePicture(values) {
    return await axios.put('/auth/update-profile-picture', values);
}

// Check password
export const checkPassword = async (id, pw) => {
    return await axios.post('/auth/check-pw', {id, pw});
}

// Update password
export const updateUserPW = async (id, newPW) => {
    return await axios.put("/auth/update-pw", {id, newPW});
}

// Check admin pass code
export const checkAdminPass = async (input, projectId) => {
    const {data} = await axios.post('/auth/admin', {input, projectId});
    return data;
}






// JWT

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
export function LS_getUser() {
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