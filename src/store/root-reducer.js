import { combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { boardsReducer } from "./boards/boards.reducer";
import { globalStatesReducer } from "./globalStates/globalStates.reducer";
import { membersReducer } from "./members/members.reducer";
import { projectReducer } from "./project/project.reducer";
import { userInfoReducer } from "./userInfo/userInfo.reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer,
    project: projectReducer,
    boards: boardsReducer,
    members: membersReducer,
    globalStates: globalStatesReducer
})