const initialState = {
    project: {}
}

const CreateNewProjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CREATE_NEW_PROJECT': {
            state.project = action.newProject
            return { ...state }
        }

        default:
            return state
    }
}
export default CreateNewProjectReducer;