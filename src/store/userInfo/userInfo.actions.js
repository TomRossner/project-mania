import { createAction } from "../utils";
import { USER_INFO_ACTION_TYPES } from "./userInfo.types";
import { getUserInfo } from "../../services/api/http.auth";

// Old way of creating actions with Redux

export const setUserInfo = (user_info) => {
    return createAction(USER_INFO_ACTION_TYPES.SET_USER_INFO, user_info);
}

export const fetchUserInfoStart = () => {
    return createAction(USER_INFO_ACTION_TYPES.FETCH_USER_INFO_START);
}

export const fetchUserInfoSuccess = (user_info) => {
    return createAction(USER_INFO_ACTION_TYPES.FETCH_USER_INFO_SUCCESS, user_info);
}

export const fetchUserInfoFailed = (error) => {
    return createAction(USER_INFO_ACTION_TYPES.FETCH_USER_INFO_FAILED, error);
}
export const setIsAdmin = (bool) => {
    return createAction(USER_INFO_ACTION_TYPES.SET_IS_ADMIN, bool);
}

let isFetchingUserInfo = false;

export const fetchUserInfoAsync = (id) => async (dispatch) => {
  if (!isFetchingUserInfo) {
    isFetchingUserInfo = true;

    dispatch(fetchUserInfoStart());

    try {
      const {data: userInfo} = await getUserInfo(id);
      dispatch(fetchUserInfoSuccess(userInfo));
    } catch (error) {
      dispatch(fetchUserInfoFailed(error));
    } finally {
      isFetchingUserInfo = false;
    }
  }
}