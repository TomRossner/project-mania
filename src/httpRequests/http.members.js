import axios from "axios";

// axios.defaults.baseURL = process.env.NODE_ENV === 'development'
// ? process.env.DEV_BASE_URL
// : process.env.PROD_BASE_URL;

axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';

export const getMembers = async () => {
    const {data} = await axios.get(`/members/all`);
    return data;
}

export const getUserByEmail = async (email) => {
    const {data} = await axios.post(`/members/:${email}`);
    return data;
}