import { GLOBAL_STATES_ACTION_TYPES } from "./globalStates.types";

const INITIAL_STATE = {
    element: "",
    notificationTabOpen: false,
    profileTabOpen: false,
    createPopupOpen: false,
    stage: null,
    projectMenuTabOpen: false,
    error: "",
    errorPopupOpen: false,
    taskPriority: "",
    tasks: [],
    adminFormOpen: false,
    notifications: [],
    moveTaskPopupOpen: false,
    taskToMove: null
}

export const globalStatesReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case GLOBAL_STATES_ACTION_TYPES.SET_ELEMENT:
            return {...state, element: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_TASK_PRIORITY:
            return {...state, taskPriority: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_CREATE_POPUP:
            return {...state, createPopupOpen: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_ERROR_POPUP:
            return {...state, errorPopupOpen: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_ERROR:
            return {...state, error: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_NOTIFICATION_TAB:
            return {...state, notificationTabOpen: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_PROJECT_MENU_TAB:
            return {...state, projectMenuTabOpen: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_PROFILE_TAB:
            return {...state, profileTabOpen: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_STAGE:
            return {...state, stage: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_TASKS:
            return {...state, tasks: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_ADMIN_PASS_FORM_OPEN:
            return {...state, adminFormOpen: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_MOVE_TASK_POPUP_OPEN:
            return {...state, moveTaskPopupOpen: payload};
        case GLOBAL_STATES_ACTION_TYPES.SET_TASK_TO_MOVE:
            return {...state, taskToMove: payload};
        default:
            return state;
    }
}