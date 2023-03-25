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