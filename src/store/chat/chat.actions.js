import { CHAT_ACTION_TYPES } from "./chat.types";
import { createAction } from "../utils";
import { getChat } from "../../httpRequests/http.chat";
import { getMembers } from "../../httpRequests/http.members";

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

export const fetchContactsStart = () => {
    return createAction(CHAT_ACTION_TYPES.FETCH_CONTACTS_START);
}

export const fetchContactsSuccess = (contacts) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_CONTACTS_SUCCESS, contacts);
}

export const fetchContactsFailed = (error) => {
    return createAction(CHAT_ACTION_TYPES.FETCH_CONTACTS_FAILED, error);
}

export const setMessages = (messages) => {
    return createAction(CHAT_ACTION_TYPES.SET_MESSAGES, messages);
}

export const setContacts = (contacts) => {
    return createAction(CHAT_ACTION_TYPES.SET_CONTACTS, contacts);
}

export const setFavorites = (favorites) => {
    return createAction(CHAT_ACTION_TYPES.SET_FAVORITES, favorites);
}

export const setFavoritesChats = (favoritesChats) => {
    return createAction(CHAT_ACTION_TYPES.SET_FAVORITES_CHATS, favoritesChats);
}

export const setChatSideBarOpen = (bool) => {
    return createAction(CHAT_ACTION_TYPES.SET_CHAT_SIDE_BAR_OPEN, bool);
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

export const fetchContactsAsync = () => async (dispatch) => {
    dispatch(fetchContactsStart());

    try {
        const contacts = await getMembers();
        dispatch(fetchContactsSuccess(contacts));
    } catch (error) {
       dispatch(fetchContactsFailed(error)); 
    }
}