import { PROJECT_MEMBERS_ACTIONS_TYPES } from "./projectMembers.types";

const INITIAL_STATE = {
    projectMembers: [],
    isLoading: false,
    error: null
}

export const projectMembersReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case PROJECT_MEMBERS_ACTIONS_TYPES.SET_PROJECT_MEMBERS:
            return {...state, projectMembers: payload};
        case PROJECT_MEMBERS_ACTIONS_TYPES.FETCH_PROJECT_MEMBERS_START:
            return {...state, isLoading: true};
        case PROJECT_MEMBERS_ACTIONS_TYPES.FETCH_PROJECT_MEMBERS_SUCCESS:
            return {...state, isLoading: false, projectMembers: payload};
        case PROJECT_MEMBERS_ACTIONS_TYPES.FETCH_PROJECT_MEMBERS_FAILED:
            return {...state, error: payload, isLoading: false};
        default:
            return state;
    }
}