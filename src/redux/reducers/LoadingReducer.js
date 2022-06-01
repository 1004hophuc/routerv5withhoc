import { HIDE_LOADING, SHOW_LOADING } from "../constants/LoginBugsConstants";

const initialState = {
    isLoading: false
}

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {

        case SHOW_LOADING:
            state.isLoading = true
            return { ...state }

        case HIDE_LOADING:
            state.isLoading = false
            return { ...state }

        default:
            return state
    }
}
export default LoadingReducer;
