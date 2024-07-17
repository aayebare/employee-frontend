import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers";

// Define initial state
const initialState = {};

// Create store with middleware
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
