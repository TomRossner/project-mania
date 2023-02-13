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

export const setSelectedElement = (elementName) => ({
    type: CHANGE_ELEMENT,
    payload: elementName
})
export const setAvailableMembers = (members) => ({
    type: CHANGE_AVAILABLE_MEMBERS,
    payload: members
})
export const setBoards = (boards) => ({
    type: CHANGE_BOARDS,
    payload: boards
})
export const setCreatePopupOpen = (boolean) => ({
    type: CHANGE_CREATE_POPUP,
    payload: boolean
})
export const setCurrentProject = (project) => ({
    type: CHANGE_CURRENT_PROJECT,
    payload: project
})
export const setErrorPopupOpen = (boolean) => ({
    type: CHANGE_ERROR_POPUP,
    payload: boolean
})
export const setNotificationTabOpen = (boolean) => ({
    type: CHANGE_NOTIFICATION_TAB,
    payload: boolean
})
export const setProfileTabOpen = (boolean) => ({
    type: CHANGE_PROFILE_TAB,
    payload: boolean
})
export const setProjectMembers = (members) => ({
    type: CHANGE_PROJECT_MEMBERS,
    payload: members
})
export const setProjectMenuOpen = (boolean) => ({
    type: CHANGE_PROJECT_MENU_TAB,
    payload: boolean
})
export const setSelectStage = (stage) => ({
    type: CHANGE_SELECTED_STAGE,
    payload: stage
})