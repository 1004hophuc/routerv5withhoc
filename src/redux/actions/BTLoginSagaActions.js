import { INFO_USER_LOGIN_SAGA } from "../constants/LoginBugsConstants"

export const TakeInfoUserLogin = (email, password, history) => {
    return {
        type: INFO_USER_LOGIN_SAGA,
        userLogin: {
            email: email,
            password: password,
            history: history
        }
    }
}