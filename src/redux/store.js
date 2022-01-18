import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import movieReducer from "./reducers";
import { dbReducer } from "./reducers";


const rootReducer = combineReducers({movieReducer, dbReducer});


export const Store = createStore(rootReducer, applyMiddleware(thunk));