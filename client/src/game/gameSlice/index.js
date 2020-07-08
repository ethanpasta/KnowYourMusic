export { connectSocket, disconnectSocket } from "./connect";
export { listenForData } from "./data";
export { signalChoice, listenForLevelResponse, updateLevel } from "./progress";
import { combineReducers } from "redux";
import progress from "./progress";
import data from "./data";
import connect from "./connect";

export default combineReducers({ progress, data, connect });
