import { CLOSE_DRAWER_MODAL, OPEN_DRAWER_MODAL } from "../constants/LoginBugsConstants"

const initialState = {
    visible: false,
    ComponentEditCreateProject: <p>Test ComponentEditCreateProject</p>,
    callBackSubmit: () => {
        alert('Click demo')
    }
}

const ModalBugsEditCreateProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER_MODAL: {
            state.visible = true
            return { ...state }
        }
        case CLOSE_DRAWER_MODAL: {
            state.visible = false
            return { ...state }
        }
        case 'OPEN_FORM_EDIT_PROJECT': {
            state.visible = true;
            state.ComponentEditCreateProject = action.Component
            return { ...state }
        }

        case 'SET_SUBMIT_EDIT_PROJECT': {
            state.callBackSubmit = action.submitFunction
            return { ...state }
        }

        default:
            return state
    }
}
export default ModalBugsEditCreateProjectReducer
