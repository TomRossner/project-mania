import { AUTH_ACTION_TYPES } from "./auth.types";

const INITIAL_STATE = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

export const authReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case AUTH_ACTION_TYPES.SET_USER:
            return {...state, user: payload, isAuthenticated: true};
        case AUTH_ACTION_TYPES.FETCH_USER_START:
            return {...state, isLoading: true};
        case AUTH_ACTION_TYPES.FETCH_USER_SUCCESS:
            return {...state, user: payload, isLoading: false, isAuthenticated: true, error: null};
        case AUTH_ACTION_TYPES.FETCH_USER_FAILED:
            return {...state, error: payload, isLoading: false};
        case AUTH_ACTION_TYPES.SET_IS_AUTHENTICATED:
            return {...state, isAuthenticated: payload};
        case AUTH_ACTION_TYPES.LOGOUT:
            return {...state, isAuthenticated: false, user: null, error: null};
        default: 
            return state;
    }
}