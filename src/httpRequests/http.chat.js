import axios from "axios";

// const EMOJI_BASE_URL = `https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_EMOJI_API_KEY}`;
const EMOJI_BASE_URL = `https://emoji-api.com/emojis?access_key=786603e44380c84b4d02ce99912f88d3dfe0d6ec`;

export const getEmojis = async () => {
    const {data} = await axios.get(EMOJI_BASE_URL);
    return data;
}

// Get chat
export const getChat = async (userId, contactId) => {
    const {data} = await axios.post('/chats/get', {userId, contactId});
    return data;
}

// Create new chat
export const createChat = async (ids) => {
    const {data} = await axios.post('/chats/create', ids);
    console.log(data);
    return data;
}