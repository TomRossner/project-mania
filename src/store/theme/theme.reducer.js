import { THEME_ACTIONS_TYPES } from "./theme.types";

const INITIAL_STATE = {
    theme: 'light'
}

export const themeReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case THEME_ACTIONS_TYPES.SET_THEME:
            return {...state, theme: payload};
        default:
            return state;
    }
}