import axios from "axios";
import jwtDecode from "jwt-decode";

// axios.defaults.baseURL = process.env.NODE_ENV === 'development'
// ? process.env.DEV_BASE_URL
// : process.env.PROD_BASE_URL;

// axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';
axios.defaults.baseURL = 'http://localhost:5000/projectmania';

const token = 'token';
setTokenHeader();

export function saveJWT(token) {
    return localStorage.setItem("token", token);
}

export async function loginUser(values) {
    const {data: {token}} = await axios.post(`/auth/sign-in`, values);
    saveJWT(token);
    setTokenHeader();
    return getUser();
}

export async function registerUser(values) {
    const {first_name, last_name, email, password} = values; // Everything except confirmedPassword
    return await axios.post(`/auth/sign-up`, {first_name, last_name, email, password});
}

export async function getUserInfo(id) {
    return await axios.get(`/auth/get/${id}`);
}

export function getJWT() {
    return localStorage.getItem(token);
}

export function setTokenHeader() {
    return setCommonHeader('x-auth-token', getJWT());
}

export function setCommonHeader(headerName, value) {
    return axios.defaults.headers.common[headerName] = value;
}

export function getUser() {
    try {
        return jwtDecode(getJWT());
    } catch {
        return null;
    }
}

export function LS_logout() {
    localStorage.removeItem(token);
    return setTokenHeader();
}