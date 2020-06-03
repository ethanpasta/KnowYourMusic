import accountReducer from "./navbar/duck";
import { combineReducers } from "redux";

export default combineReducers({
	account: accountReducer,
});
