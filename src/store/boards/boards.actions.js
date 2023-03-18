import { getProjects } from "../../httpRequests/http.project";
import { createAction } from "../utils"
import { BOARDS_ACTION_TYPES } from "./boards.types"

export const setBoards = (boards) => {
    return createAction(BOARDS_ACTION_TYPES.SET_BOARDS, boards);
}

export const fetchBoardsStart = () => {
    return createAction(BOARDS_ACTION_TYPES.FETCH_BOARDS_START);
}

export const fetchBoardsSuccess = (boards) => {
    return createAction(BOARDS_ACTION_TYPES.FETCH_BOARDS_SUCCESS, boards);
}

export const fetchBoardsFailed = (error) => {
    return createAction(BOARDS_ACTION_TYPES.FETCH_BOARDS_FAILED, error);
}

export const fetchBoardsAsync = (id) => async (dispatch) => {
    dispatch(fetchBoardsStart());

    try {
        const boards = await getProjects(id);
        dispatch(fetchBoardsSuccess(boards));
    } catch (error) {
        dispatch(fetchBoardsFailed(error));
    }
}