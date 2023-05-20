import axios from "axios";

// Get chat
export const getChat = async (userId, contactId) => {
    const {data} = await axios.post('/chats/get', {userId, contactId});
    return data;
}

// Create new chat
export const createChat = async (ids) => {
    const {data} = await axios.post('/chats/create', ids);
    return data;
}

// Get user chats
export const getUserChats = async (userId) => {
    const {data} = await axios.post('/chats/get/all', {userId});
    return data;
}

// Add to favorites
export const addToFavorites = async (contactId) => {
    return await axios.post('/chats/favorites/add', {contactId});
}

// Remove from favorites
export const removeFromFavorites = async (contactId) => {
    return await axios.post('/chats/favorites/remove', {contactId});
}