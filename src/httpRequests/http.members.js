import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
? 'http://localhost:5000/projectmania'
: 'http://tomrossner.dev/projectmania';

export const getMembers = async () => {
    const {data} = await axios.get(`/members/all`);
    return data;
}

export const getUserByEmail = async (email) => {
    const {data} = await axios.post(`/members`, {email});
    return data;
}