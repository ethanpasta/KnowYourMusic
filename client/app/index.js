import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./components/App";
import reducer from "./reducers";

const middlewares = [thunk];

// Add logger to middleware if in development mode
if (process.env.NODE_ENV === `development`) {
	const { logger } = require("redux-logger");
	middlewares.push(logger);
}

const middleware = applyMiddleware(...middlewares);
const store = createStore(reducer, middleware);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
