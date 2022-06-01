import { LoginService } from '../../services/BTLoginSagaService';
import { fork, call, put, takeLatest, take, delay, select } from 'redux-saga/effects';
import { INFO_USER, STATUS_CODE, TOKEN } from '../../util/constants/settingsystems';
import { HIDE_LOADING, INFO_USER_LOGIN_SAGA, SHOW_LOADING } from '../constants/LoginBugsConstants';
import { history } from '../../util/libs/history';

// Quản lý các action Saga

function* DangNhapSagaAction(action) {
    console.log(action)

    yield put({
        type: SHOW_LOADING
    })
    yield delay(1000);

    try {

        let { data, status } = yield call(() => LoginService.dangNhap(action.userLogin));
        console.log(data)

        // Lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(INFO_USER, JSON.stringify(data.content));

        // Sau khi đăng nhập thành công thì lưu data vào local store, sau đó dispatch cái dữ liệu này lên reducer, để có người khác đăng nhập vào thì nó cũng làm y hệt vậy, lúc ấy sẽ hiển thị thông tin user khác

        yield put({
            type: 'USLOGIN',
            userLogin: data.content
        })

        // Lấy history trên reducer để thường hưởng thuộc tính của component để redirect đến trang mong muốn
        // let history = yield select(state => state.HistoryReducer.history);
        history.push('/home');

    } catch (error) {

        console.log(error)

    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiDangNhapSagaAction() {
    yield takeLatest(INFO_USER_LOGIN_SAGA, DangNhapSagaAction)
}