import { BOARDS_ACTION_TYPES } from "./boards.types";

const INITIAL_STATE = {
    boards: [],
    isLoading: false,
    error: null
}

export const boardsReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case BOARDS_ACTION_TYPES.SET_BOARDS:
            return {...state, boards: payload};
        case BOARDS_ACTION_TYPES.FETCH_BOARDS_START:
            return {...state, isLoading: true};
        case BOARDS_ACTION_TYPES.FETCH_BOARDS_SUCCESS:
            return {...state, boards: payload, isLoading: false};
        case BOARDS_ACTION_TYPES.FETCH_BOARDS_FAILED:
            return {...state, error: payload, isLoading: false};
        default:
            return state;
    }
}