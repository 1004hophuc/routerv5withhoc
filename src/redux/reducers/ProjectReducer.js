const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "description": "string",
        "categoryId": 'string',
    }
}

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TAKE_INFO_PROJECT_EDIT': {
            state.projectEdit = action.projectEdit
            return { ...state }
        }

        default:
            return state
    }
}

export default ProjectReducer
