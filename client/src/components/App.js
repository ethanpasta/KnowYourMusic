import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

const App = () => {
	return (
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/game" component={Game} />
		</Switch>
	);
};

export default App;
