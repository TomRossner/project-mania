import axios from "axios";

// Set Axios base URL
axios.defaults.baseURL = 'http://localhost:5000/projectmania';
// axios.defaults.baseURL = 'http://tomrossner.dev/projectmania';

// Get all members
export const getMembers = async () => {
    const {data} = await axios.get(`/members/all`);
    return data;
}

// Get user by email
export const getUserByEmail = async (email) => {
    const {data} = await axios.post(`/members`, {email});
    return data;
}

// Send message
export const sendMessage = async (message, targetUser) => {
    const {data} = await axios.post('/members/send-message', {message, to: targetUser});
    console.log(data);
    return data;
}

// Get chat
export const getChat = async (ids) => {
    const {data} = await axios.post('/chats/get', ids);
    console.log(data);
    return data;
}

// Create new chat
export const createChat = async (ids) => {
    const {data} = await axios.post('/chats/create', ids);
    console.log(data);
    return data;
}