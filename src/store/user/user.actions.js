import { USER_ACTION_TYPES } from "./user.types";
import {createAction} from "../action-creator";

export const setUser = (user) => {
    return createAction(USER_ACTION_TYPES.SET_USER, user);
}