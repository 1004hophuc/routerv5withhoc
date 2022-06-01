import { all } from "@redux-saga/core/effects";
import * as APIBTLoginSaga from './APIBTLoginSaga';
import * as ProjectCategorySaga from './ProjectCategorySaga'
import * as ProjectSaga from './ProjectSaga'

export function* rootSaga() {
    yield all([
        APIBTLoginSaga.theoDoiDangNhapSagaAction(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoiCreateNewProjectAction(),
        ProjectSaga.theoDoiGetAllProjectAction(),
        ProjectSaga.theoDoiUpdateProjectAction(),
        ProjectSaga.theoDoiDeleteProjectAction()
    ])
}