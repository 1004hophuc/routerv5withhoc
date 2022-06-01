import { call, put, takeLatest, delay } from "redux-saga/effects";
import { LoginService } from "../../services/BTLoginSagaService";
import { STATUS_CODE } from "../../util/constants/settingsystems";
import { CLOSE_DRAWER_MODAL, CREATE_NEW_PROJECT, CREATE_NEW_PROJECT_SAGA, GET_ALL_LIST_PROJECT, GET_ALL_LIST_PROJECT_SAGA, HIDE_LOADING, SHOW_LOADING } from "../constants/LoginBugsConstants";
import { history } from "../../util/libs/history";
import NotificationFunction from "../../util/notifications/NotificationBugs";

function* createNewProjectSaga(action) {
    yield put({
        type: SHOW_LOADING
    })
    yield delay(1000)
    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => LoginService.createNewProjectAuthorization(action.newProject));
        // console.log(data)

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {

            history.push('/projectmanagement');

        }
    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiCreateNewProjectAction() {
    yield takeLatest(CREATE_NEW_PROJECT_SAGA, createNewProjectSaga);
}

/*
- Ngày 6/5 Phúc viết function getAllListProjectSaga
*/

function* getAllListProjectAction(action) {
    // console.log('actionCGetAllListProject', action)

    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => LoginService.getAllListProject());
        console.log(data)

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_LIST_PROJECT,
                listProject: data.content
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiGetAllProjectAction() {
    yield takeLatest(GET_ALL_LIST_PROJECT_SAGA, getAllListProjectAction);
}

/*
- Ngày 11/5 Phúc viết function updateProjectSaga
*/

function* updateProjectActionSaga(action) {
    // console.log(action)
    yield put({
        type: SHOW_LOADING
    })
    yield delay(1000)
    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => LoginService.updateProject(action.projectUpdate));
        // console.log(data)

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: GET_ALL_LIST_PROJECT_SAGA
            })

            yield put({
                type: CLOSE_DRAWER_MODAL
            })

        }
    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiUpdateProjectAction() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectActionSaga);
}

/*
- Ngày 11/5 Phúc viết function deleteProject
*/
function* deleteProjectActionSaga(action) {
    console.log(action)
    yield put({
        type: SHOW_LOADING
    })
    yield delay(1000)
    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => LoginService.deleteProject(action.projectId));
        console.log(data)

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {

            NotificationFunction('success', 'Xoá project thành công!');

            yield put({
                type: GET_ALL_LIST_PROJECT_SAGA
            })

            // yield put({
            //     type: CLOSE_DRAWER_MODAL
            // })

        } else {
            NotificationFunction('error', 'Xoá project thất bại!');
        }
    } catch (err) {
        console.log(err);
        NotificationFunction('error', 'Xoá project thất bại!');
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiDeleteProjectAction() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectActionSaga);
}