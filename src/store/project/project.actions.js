import { PROJECT_ACTION_TYPES } from "./project.types";
import { createAction } from "../utils";

export const setCurrentProject = (project) => {
    return createAction(PROJECT_ACTION_TYPES.SET_CURRENT_PROJECT, project);
}
export const setProjectMembers = (members) => {
    return createAction(PROJECT_ACTION_TYPES.SET_PROJECT_MEMBERS, members);
}
export const setBoards = (boards) => {
    return createAction(PROJECT_ACTION_TYPES.SET_BOARDS, boards);
}
export const addActivity = (activity) => {
    return createAction(PROJECT_ACTION_TYPES.ADD_ACTIVITY, activity);
}
export const setActivity = (activities) => {
    return createAction(PROJECT_ACTION_TYPES.SET_ACTIVITY, activities);
}
export const updateCurrentProjectStart = (project) => {
    return createAction(PROJECT_ACTION_TYPES.UPDATE_CURRENT_PROJECT_START, project);
}
export const updateCurrentProjectSuccess = () => {
    return createAction(PROJECT_ACTION_TYPES.UPDATE_CURRENT_PROJECT_SUCCESS);
}
export const updateCurrentProjectFailed = (error) => {
    return createAction(PROJECT_ACTION_TYPES.UPDATE_CURRENT_PROJECT_FAILED, error);
}