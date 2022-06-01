import { INFO_USER } from "../../util/constants/settingsystems"

let usLogin = {};

if (localStorage.getItem(INFO_USER)) {
    usLogin = JSON.parse(localStorage.getItem(INFO_USER));
}

const initialState = {
    userLogin: usLogin
}

const StoreUserInLocalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USLOGIN': {
            state.userLogin = action.userLogin
            return { ...state }
        }

        default:
            return state
    }
}
export default StoreUserInLocalReducer;
