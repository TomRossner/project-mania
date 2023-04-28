import { combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { boardsReducer } from "./boards/boards.reducer";
import { globalStatesReducer } from "./globalStates/globalStates.reducer";
import { membersReducer } from "./members/members.reducer";
import { projectReducer } from "./project/project.reducer";
import { userInfoReducer } from "./userInfo/userInfo.reducer";
import { chatReducer } from './chat/chat.reducer';
import { themeReducer } from "./theme/theme.reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer,
    project: projectReducer,
    boards: boardsReducer,
    members: membersReducer,
    globalStates: globalStatesReducer,
    chat: chatReducer,
    theme: themeReducer,
})