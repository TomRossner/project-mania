import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from "redux-saga";
// import { rootSaga } from './rootSaga';


// Create a store using plain Redux

// Saga Middle-ware

// const sagaMiddleware = createSagaMiddleware();
// sagaMiddleware.run(rootSaga);

const middleWares = [thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);


// Create a store using Redux-Toolkit

// const middleware = [logger];

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware,
//     devTools: true
// })