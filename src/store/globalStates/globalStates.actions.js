import { GLOBAL_STATES_ACTION_TYPES } from "./globalStates.types";
import { createAction } from "../utils";

export const setCreatePopupOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_CREATE_POPUP, bool);
}
export const setElement = (element) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_ELEMENT, element);
}
export const setError = (error) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_ERROR, error);
}
export const setErrorPopupOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_ERROR_POPUP, bool);
}
export const setNotificationTabOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_NOTIFICATION_TAB, bool);
}
export const setProfileTabOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_PROFILE_TAB, bool);
}
export const setProjectMenuOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_PROJECT_MENU_TAB, bool);
}
export const setStage = (stage) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_STAGE, stage);
}
export const setTaskPriority = (priority) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_TASK_PRIORITY, priority);
}
export const setTasks = (tasks) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_TASKS, tasks);
}
export const setAdminPassFormOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_ADMIN_PASS_FORM_OPEN, bool);
}
export const setNotifications= (notification) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_NOTIFICATIONS, notification);
}
export const setMoveTaskPopupOpen= (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_MOVE_TASK_POPUP_OPEN, bool);
}
export const setTaskToMove= (task) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_TASK_TO_MOVE, task);
}
export const setChangePriorityPopupOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_CHANGE_PRIORITY_POPUP_OPEN, bool);
}
export const setNavOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_NAV_OPEN, bool);
}
export const setActivitySectionOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_ACTIVITY_SECTION_OPEN, bool);
}
export const setIsMobile = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_IS_MOBILE, bool);
}
export const setAdminModalOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_ADMIN_MODAL_OPEN, bool);
}
export const setUserProfileOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_USER_PROFILE_OPEN, bool);
}
export const setTargetUser = (user) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_TARGET_USER, user);
}
export const setTaskOpen = (bool) => {
    return createAction(GLOBAL_STATES_ACTION_TYPES.SET_TASK_OPEN, bool);
}