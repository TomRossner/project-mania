import { PROJECT_ACTION_TYPES } from "./project.types";

const INITIAL_STATE = {
    boards: [],
    projectMembers: [],
    currentProject: null,
    activity: []
}

export const projectReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case PROJECT_ACTION_TYPES.SET_CURRENT_PROJECT:
            return {...state, currentProject: payload};
        case PROJECT_ACTION_TYPES.SET_PROJECT_MEMBERS:
            return {...state, projectMembers: payload};
        case PROJECT_ACTION_TYPES.SET_BOARDS:
            return {...state, boards: payload};
        case PROJECT_ACTION_TYPES.ADD_ACTIVITY:
            return {...state, activity: payload};
        default:
            return state;
    }
}