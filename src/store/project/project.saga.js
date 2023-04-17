import { takeLatest, all, call, put } from "redux-saga/effects";
import { PROJECT_ACTION_TYPES } from "./project.types";
import { updateProject } from "../../httpRequests/http.project";
import { updateCurrentProjectFailed, updateCurrentProjectSuccess } from "./project.actions";

export function* onUpdateCurrentProjectStart() {
    yield takeLatest(PROJECT_ACTION_TYPES.UPDATE_CURRENT_PROJECT_START, updateProjectAsync);
}

export function* updateProjectAsync(action) {
    try {
        const {payload} = action;
        yield call(updateProject, payload);
        yield put(updateCurrentProjectSuccess());
        console.log("Updated successfully");
    } catch (error) {
        console.log(error);
        yield put(updateCurrentProjectFailed(error));
    }
}

export function* currentProjectSaga() {
    yield all([call(onUpdateCurrentProjectStart)]);
}