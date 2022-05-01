import {  createStore } from "redux";
import combineReducers from "../reducer/combined-reducers";

const store = createStore(combineReducers,{});

export default store;