import { getMembers } from "../../httpRequests/http.project";
import { createAction } from "../utils";
import { MEMBERS_ACTION_TYPES } from "./members.types";

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