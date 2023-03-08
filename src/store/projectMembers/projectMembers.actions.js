import { createAction } from "../action-creator";
import { PROJECT_MEMBERS_ACTIONS_TYPES } from "./projectMembers.types";

export const setProjectMembers = (members) => {
    return createAction(PROJECT_MEMBERS_ACTIONS_TYPES.SET_PROJECT_MEMBERS, members);
}

// export const fetchProjectMembersStart = () => {
//     return createAction(PROJECT_MEMBERS_ACTIONS_TYPES.FETCH_PROJECT_MEMBERS_START);
// }

// export const fetchProjectMembersSuccess = (members) => {
//     return createAction(PROJECT_MEMBERS_ACTIONS_TYPES.FETCH_PROJECT_MEMBERS_SUCCESS, members);
// }

// export const fetchProjectMembersFailed = (error) => {
//     return createAction(PROJECT_MEMBERS_ACTIONS_TYPES.FETCH_PROJECT_MEMBERS_FAILED, error);
// }