import axios from "axios";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';
const token = 'token';
setTokenHeader();

export async function loginUser(values) {
    const {data} = await axios.post(`/auth/login`, values);
    localStorage.setItem("token", data.token);
    return setTokenHeader();
}

export async function addNewUser(values) {
    const {first_name, last_name, email, password} = values;
    return await axios.post(`/auth/register`, {first_name, last_name, email, password});
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

export function logout() {
    localStorage.removeItem(token);
    return setTokenHeader();
}