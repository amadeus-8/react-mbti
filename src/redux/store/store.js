import {createStore, combineReducers} from "redux"
import questionReducer from "../reducers/questionReducer"
import {composeWithDevTools} from "redux-devtools-extension";

let reducers = combineReducers({
    questions: questionReducer
})

let store = createStore(reducers, composeWithDevTools())

window.store = store

export default store