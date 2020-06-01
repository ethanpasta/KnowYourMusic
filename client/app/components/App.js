import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/game" component={Game} />
			</Switch>
		</Router>
	);
};

export default App;
