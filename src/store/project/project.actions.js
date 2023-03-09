import { PROJECT_ACTION_TYPES } from "./project.types";
import { createAction } from "../action-creator";

export const setCreatePopupOpen = (bool) => {
    return createAction(PROJECT_ACTION_TYPES.SET_CREATE_POPUP, bool);
}
export const setCurrentProject = (project) => {
    return createAction(PROJECT_ACTION_TYPES.SET_CURRENT_PROJECT, project);
}
export const setElement = (element) => {
    return createAction(PROJECT_ACTION_TYPES.SET_ELEMENT, element);
}
export const setError = (error) => {
    return createAction(PROJECT_ACTION_TYPES.SET_ERROR, error);
}
export const setErrorPopupOpen = (bool) => {
    return createAction(PROJECT_ACTION_TYPES.SET_ERROR_POPUP, bool);
}
export const setNotificationTabOpen = (bool) => {
    return createAction(PROJECT_ACTION_TYPES.SET_NOTIFICATION_TAB, bool);
}
export const setProfileTabOpen = (bool) => {
    return createAction(PROJECT_ACTION_TYPES.SET_PROFILE_TAB, bool);
}
export const setProjectMenuOpen = (bool) => {
    return createAction(PROJECT_ACTION_TYPES.SET_PROJECT_MENU_TAB, bool);
}
export const setStage = (stage) => {
    return createAction(PROJECT_ACTION_TYPES.SET_STAGE, stage);
}
export const setTaskPriority = (priority) => {
    return createAction(PROJECT_ACTION_TYPES.SET_TASK_PRIORITY, priority);
}
export const setProjectMembers = (members) => {
    return createAction(PROJECT_ACTION_TYPES.SET_PROJECT_MEMBERS, members);
}