import { MEMBERS_ACTION_TYPES } from "./members.types";

const INITIAL_STATE = {
    members: [],
    isLoading: false,
    error: null
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
        default:
            return state;
    }
} 