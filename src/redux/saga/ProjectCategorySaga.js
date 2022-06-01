

import { call, put, takeLatest } from "redux-saga/effects";
import { LoginService } from "../../services/BTLoginSagaService";
import { STATUS_CODE } from "../../util/constants/settingsystems";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../constants/LoginBugsConstants";

function* getAllProjectCategorySaga(action) {
    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => LoginService.getAllProjectCategory());

        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            });
        }


    } catch (err) {
        console.log(err);
    }

}

export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}