import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { projectReducer } from "./project/project.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    project: projectReducer
})