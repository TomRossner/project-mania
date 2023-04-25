import { CHAT_ACTION_TYPES } from "./chat.types";

const INITIAL_STATE = {
    currentChat: null,
    isLoading: false,
    error: null,
    currentContact: null
}

export const chatReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case CHAT_ACTION_TYPES.SET_CHAT:
            return {...state, currentChat: payload};
        case CHAT_ACTION_TYPES.FETCH_CHAT_START:
            return {...state, isLoading: true};
        case CHAT_ACTION_TYPES.FETCH_CHAT_SUCCESS:
            return {...state, currentChat: payload, isLoading: false};
        case CHAT_ACTION_TYPES.FETCH_CHAT_FAILED:
            return {...state, isLoading: false, error: payload};
        case CHAT_ACTION_TYPES.SET_CURRENT_CONTACT:
            return {...state, currentContact: payload};
        default:
            return state;
    }
}