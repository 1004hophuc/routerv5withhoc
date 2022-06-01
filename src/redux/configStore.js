import { applyMiddleware, combineReducers, createStore } from 'redux';
import LoadingReducer from './reducers/LoadingReducer';

import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import HistoryReducer from './reducers/HistoryReducer';
import StoreUserInLocalReducer from './reducers/StoreInfoUserInLocalReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import GetAllProjectReducer from './reducers/GetAllProjectReducer';
import ModalBugsEditCreateProjectReducer from './reducers/ModalEditCreateProjectReducer';
import ProjectReducer from './reducers/ProjectReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    LoadingReducer,
    HistoryReducer,
    StoreUserInLocalReducer,
    ProjectCategoryReducer,
    GetAllProjectReducer,
    ModalBugsEditCreateProjectReducer,
    ProjectReducer

})

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);

export default store;