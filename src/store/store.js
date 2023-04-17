import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './rootSaga';


//Old way of creating a Redux store
const sagaMiddleware = createSagaMiddleware();

const middleWares = [thunk, sagaMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

// New way

// const middleware = [logger];

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware,
//     devTools: true
// })