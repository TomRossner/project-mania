import { USER_INFO_ACTION_TYPES } from "./userInfo.types";

const INITIAL_STATE = {
    userInfo: null,
    isLoading: false,
    error: null,
    isAdmin: false,
}

export const userInfoReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case USER_INFO_ACTION_TYPES.SET_USER_INFO:
            return {...state, userInfo: payload};
        case USER_INFO_ACTION_TYPES.FETCH_USER_INFO_START:
            return {...state, isLoading: true};
        case USER_INFO_ACTION_TYPES.FETCH_USER_INFO_SUCCESS:
            return {...state, isLoading: false, userInfo: payload};
        case USER_INFO_ACTION_TYPES.FETCH_USER_INFO_FAILED:
            return {...state, error: payload, isLoading: false};
        case USER_INFO_ACTION_TYPES.SET_IS_ADMIN:
            return {...state, isAdmin: payload};
        default:
            return state;
    }
}