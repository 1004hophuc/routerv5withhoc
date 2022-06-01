import { GET_ALL_LIST_PROJECT } from "../constants/LoginBugsConstants";

const initialState = {
    listProject: []
}

const GetAllProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_LIST_PROJECT: {
            state.listProject = action.listProject
            return { ...state }
        }

        default:
            return state
    }
}

export default GetAllProjectReducer;
