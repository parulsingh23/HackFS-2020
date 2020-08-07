import { combineReducers } from "redux";
import listsReducer from "./listsReducer.js";

export default combineReducers({
    lists: listsReducer
});