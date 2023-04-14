import { all, call } from "redux-saga/effects";
import { currentProjectSaga } from "./project/project.saga";

export function* rootSaga() {
    yield all([call(currentProjectSaga)]);
}