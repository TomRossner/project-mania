import { takeLatest, all, call, put } from "redux-saga/effects";
import { PROJECT_ACTION_TYPES } from "./project.types";
import { updateProject } from "../../httpRequests/http.project";

export function* onUpdateCurrentProject() {
    yield takeLatest(PROJECT_ACTION_TYPES.UPDATE_CURRENT_PROJECT, updateProjectAsync);
}

export function* updateProjectAsync(action) {
    try {
        const {payload} = action;
        yield call(updateProject, payload);
        console.log("Updated successfully");
    } catch (error) {
        console.log(error);
    }
}

export function* currentProjectSaga() {
    yield all([call(onUpdateCurrentProject)]);
}