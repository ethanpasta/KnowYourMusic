import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./src/state";
import App from "./src/App";

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
