import {
    CHANGE_ELEMENT,
    CHANGE_AVAILABLE_MEMBERS,
    CHANGE_BOARDS,
    CHANGE_CREATE_POPUP,
    CHANGE_CURRENT_PROJECT,
    CHANGE_ERROR_POPUP,
    CHANGE_NOTIFICATION_TAB,
    CHANGE_PROFILE_TAB,
    CHANGE_PROJECT_MEMBERS,
    CHANGE_PROJECT_MENU_TAB,
    CHANGE_SELECTED_STAGE
} from "./constants";

const initialState = {
    selectedElement: "",
    availableMembers: [],
    boards: [],
    createPopupOpen: false,
    currentProject: null,
    errorPopupOpen: false,
    notificationTabOpen: false,
    profileTabOpen: false,
    projectMembers: [],
    projectMenuTabOpen: false,
    selectedStage: null,
}

export const projectReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case CHANGE_BOARDS: 
            return {...state, boards: action.payload};
        case CHANGE_CURRENT_PROJECT:
            return {...state, currentProject: action.payload};
        case CHANGE_SELECTED_STAGE:
            return {...state, selectedStage: action.payload};
        case CHANGE_PROJECT_MEMBERS:
            return {...state, projectMembers: action.payload};
        case CHANGE_AVAILABLE_MEMBERS:
            return {...state, availableMembers: action.payload};
        case CHANGE_ELEMENT:
            return {...state, selectedElement: action.payload};
        default:
            return state;
    }
}

export const tabsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case CHANGE_CREATE_POPUP:
            return {...state, createPopupOpen: action.payload};
        case CHANGE_ERROR_POPUP:
            return {...state, errorPopupOpen: action.payload};
        case CHANGE_NOTIFICATION_TAB:
            return {...state, notificationTabOpen: action.payload};
        case CHANGE_PROJECT_MENU_TAB:
            return {...state, projectMenuTabOpen: action.payload};
        case CHANGE_PROFILE_TAB:
            return {...state, profileTabOpen: action.payload};
        default:
            return state;
    }
}

export const projectRed = projectReducer();
export const tabsRed = tabsReducer();

export const rootReducer = () => {
    return {
        projectRed,
        tabsRed
    }
}