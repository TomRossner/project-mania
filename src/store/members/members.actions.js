import { getMembers, getUserByEmail } from "../../httpRequests/http.members";
import { createAction } from "../utils";
import { MEMBERS_ACTION_TYPES } from "./members.types";

export const setMembers = (members) => {
    return createAction(MEMBERS_ACTION_TYPES.SET_MEMBERS, members);
}
export const fetchMembersStart = () => {
    return createAction(MEMBERS_ACTION_TYPES.FETCH_MEMBERS_START);
}
export const fetchMembersSuccess = (members) => {
    return createAction(MEMBERS_ACTION_TYPES.FETCH_MEMBERS_SUCCESS, members);
}
export const fetchMembersFailed = (error) => {
    return createAction(MEMBERS_ACTION_TYPES.FETCH_MEMBERS_FAILED, error);
}

export const fetchMembersAsync = () => async (dispatch) => {
    dispatch(fetchMembersStart());

    try {
        const members = await getMembers();
        dispatch(fetchMembersSuccess(members));
    } catch (error) {
        dispatch(fetchMembersFailed(error));
    }
}



export const fetchOtherUserStart = () => {
    return createAction(MEMBERS_ACTION_TYPES.FETCH_MEMBERS_START);
}
export const fetchOtherUserSuccess = (user) => {
    return createAction(MEMBERS_ACTION_TYPES.FETCH_MEMBERS_SUCCESS, user);
}
export const fetchOtherUserFailed = (error) => {
    return createAction(MEMBERS_ACTION_TYPES.FETCH_MEMBERS_FAILED, error);
}
export const setOtherUser = (user) => {
    return createAction(MEMBERS_ACTION_TYPES.SET_OTHER_USER, user);
}

export const fetchOtherUserAsync = (email) => async (dispatch) => {
    dispatch(fetchOtherUserStart());

    try {
        const user = await getUserByEmail(email);
        dispatch(fetchOtherUserSuccess(user));
    } catch (error) {
        dispatch(fetchOtherUserFailed(error));
    }
}