import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';


//Old way of creating a Redux store

const middleWares = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(rootReducer, undefined, composedEnhancers);

// New way

// const middleware = [logger];

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware,
//     devTools: true
// })