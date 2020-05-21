import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./HomePage/Home";
import About from "./About";

const App = () => {
	return (
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/me" component={About} />
		</Switch>
	);
};

export default App;
