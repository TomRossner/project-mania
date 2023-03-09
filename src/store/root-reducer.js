import { combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { boardsReducer } from "./boards/boards.reducer";
import { membersReducer } from "./members/members.reducer";
import { projectReducer } from "./project/project.reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    boards: boardsReducer,
    members: membersReducer
})