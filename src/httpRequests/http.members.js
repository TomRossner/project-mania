import axios from "axios";

// Set Axios base URL
// process.env.NODE_ENV === 'development'
// ? axios.defaults.baseURL = 'http://localhost:5000/projectmania'
// : axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';
// axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/projectmania' : 'https://tomrossner.dev/projectmania';

// Get all members
export const getMembers = async () => {
    const {data} = await axios.get(`/members/all`);
    return data;
}

// Get user by email
export const getUserByEmail = async (email) => {
    const {data} = await axios.post(`/members/get/email/${email}`);
    return data;
}

// Get user by ID
export const getUserById = async (id) => {
    const {data} = await axios.post(`/members/get/id/${id}`);
    return data;
}