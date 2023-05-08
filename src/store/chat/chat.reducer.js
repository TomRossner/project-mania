import { CHAT_ACTION_TYPES } from "./chat.types";

const INITIAL_STATE = {
    currentChat: null,
    isLoading: false,
    error: null,
    currentContact: null,
    messages: [],
    chats: [],
    contacts: [],
    favorites: [],
    favoritesChats: [],
    chatSideBarOpen: false,
}

export const chatReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        // Chats
        case CHAT_ACTION_TYPES.SET_CHAT:
            return {...state, currentChat: payload};
        case CHAT_ACTION_TYPES.SET_CHATS:
            return {...state, chats: payload};

        // Fetch chats
        case CHAT_ACTION_TYPES.FETCH_CHAT_START:
            return {...state, isLoading: true};
        case CHAT_ACTION_TYPES.FETCH_CHAT_SUCCESS:
            return {...state, currentChat: payload, isLoading: false};
        case CHAT_ACTION_TYPES.FETCH_CHAT_FAILED:
            return {...state, isLoading: false, error: payload};

        // Fetch contacts
        case CHAT_ACTION_TYPES.FETCH_CONTACTS_START:
            return {...state, isLoading: true};
        case CHAT_ACTION_TYPES.FETCH_CONTACTS_SUCCESS:
            return {...state, contacts: payload, isLoading: false};
        case CHAT_ACTION_TYPES.FETCH_CONTACTS_FAILED:
            return {...state, isLoading: false, error: payload};

        // Contacts
        case CHAT_ACTION_TYPES.SET_CURRENT_CONTACT:
            return {...state, currentContact: payload};
        case CHAT_ACTION_TYPES.SET_CONTACTS:
            return {...state, contacts: payload};

        // Messages
        case CHAT_ACTION_TYPES.SET_MESSAGES:
            return {...state, messages: payload};
        
        // Favorites
        case CHAT_ACTION_TYPES.SET_FAVORITES:
            return {...state, favorites: payload};
        case CHAT_ACTION_TYPES.SET_FAVORITES_CHATS:
            return {...state, favoritesChats: payload};
        
        // Chat side bar
        case CHAT_ACTION_TYPES.SET_CHAT_SIDE_BAR_OPEN:
            return {...state, chatSideBarOpen: payload};
        
        // Default
        default:
            return state;
    }
}