import { CHAT_ACTION_TYPES } from "./chat.types";
import { createAction } from "../utils";
import { getChat } from "../../httpRequests/http.chat";

export const setChat = (chat) => {
    return createAction(CHAT_ACTION_TYPES.SET_CHAT, chat);
}

export const setChats = (chats) => {
    return createAction(CHAT_ACTION_TYPES.SET_CHATS, chats);
}

// export const addChat = (chat) => {
//     return createAction(CHAT_ACTION_TYPES.ADD_CHAT, chat);
// }

// export const deleteChat = (chatId) => {
//     return createAction(CHAT_ACTION_TYPES.DELETE_CHAT, chatId);
// }
export const setCurrentContact = (contact) => {
    return createAction(CHAT_ACTION_TYPES.SET_CURRENT_CONTACT, contact);
}

export const fetchChatStart = () => {
    return createAction(CHAT_ACTION_TYPES.FETCH_CHAT_START);
}

export const fetchChatSuccess = (chat) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_CHAT_SUCCESS, chat);
}

export const fetchChatFailed = (error) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_CHAT_FAILED, error);
}

export const setMessages = (messages) => {
    return createAction(CHAT_ACTION_TYPES.SET_MESSAGES, messages);
}


export const fetchChatAsync = (userId, contactId) => async (dispatch) => {
    dispatch(fetchChatStart());

    try {
        const chat = await getChat(userId, contactId);
        dispatch(fetchChatSuccess(chat));
    } catch (error) {
       dispatch(fetchChatFailed(error)); 
    }
}