import { PROJECT_ACTION_TYPES } from "./project.types";

const INITIAL_STATE = {
    element: "",
    boards: [],
    projectMembers: [],
    currentProject: null,
    notificationTabOpen: false,
    profileTabOpen: false,
    availableMembers: [],
    createPopupOpen: false,
    stage: null,
    projectMenuOpen: false,
    error: "",
    errorPopupOpen: false,
    taskPriority: ""
}

export const projectReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case PROJECT_ACTION_TYPES.SET_BOARDS:
            return {...state, boards: payload};
        case PROJECT_ACTION_TYPES.SET_CURRENT_PROJECT:
            return {...state, currentProject: payload};
        case PROJECT_ACTION_TYPES.SET_SELECTED_STAGE:
            return {...state, stage: payload};
        case PROJECT_ACTION_TYPES.SET_PROJECT_MEMBERS:
            return {...state, projectMembers: payload};
        case PROJECT_ACTION_TYPES.SET_AVAILABLE_MEMBERS:
            return {...state, availableMembers: payload};
        case PROJECT_ACTION_TYPES.SET_ELEMENT:
            return {...state, element: payload};
        case PROJECT_ACTION_TYPES.SET_TASK_PRIORITY:
            return {...state, taskPriority: payload};
        case PROJECT_ACTION_TYPES.SET_CREATE_POPUP:
            return {...state, createPopupOpen: payload};
        case PROJECT_ACTION_TYPES.SET_ERROR_POPUP:
            return {...state, errorPopupOpen: payload};
        case PROJECT_ACTION_TYPES.SET_ERROR:
            return {...state, error: payload};
        case PROJECT_ACTION_TYPES.SET_NOTIFICATION_TAB:
            return {...state, notificationTabOpen: payload};
        case PROJECT_ACTION_TYPES.SET_PROJECT_MENU_TAB:
            return {...state, projectMenuTabOpen: payload};
        case PROJECT_ACTION_TYPES.SET_PROFILE_TAB:
            return {...state, profileTabOpen: payload};
        default:
            return state;
    }
}