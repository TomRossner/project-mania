import { THEME_ACTIONS_TYPES } from "./theme.types";
import { createAction } from "../utils";

export const setTheme = (theme) => {
    return createAction(THEME_ACTIONS_TYPES.SET_THEME, theme);
}