import { MEMBERS_ACTION_TYPES } from "./members.types";

const INITIAL_STATE = {
    members: [],
    isLoading: false,
    error: null,
    otherUser: null
}

export const membersReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case MEMBERS_ACTION_TYPES.FETCH_MEMBERS_START:
            return {...state, isLoading: true};
        case MEMBERS_ACTION_TYPES.FETCH_MEMBERS_SUCCESS:
            return {...state, members: payload, isLoading: false};
        case MEMBERS_ACTION_TYPES.FETCH_MEMBERS_FAILED:
            return {...state, error: payload, isLoading: false};
        case MEMBERS_ACTION_TYPES.FETCH_OTHER_USER_START:
            return {...state, isLoading: true};
        case MEMBERS_ACTION_TYPES.FETCH_OTHER_USER_SUCCESS:
            return {...state, isLoading: false, otherUser: payload};
        case MEMBERS_ACTION_TYPES.FETCH_OTHER_USER_FAILED:
            return {...state, error: payload, isLoading: false};
        case MEMBERS_ACTION_TYPES.SET_OTHER_USER:
            return {...state, otherUser: payload};
        default:
            return state;
    }
} 