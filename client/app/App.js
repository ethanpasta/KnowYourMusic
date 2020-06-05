import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./home/HomeContainer";
import Game from "./components/Game";
import NavbarContainer from "./navbar/NavbarContainer";
import Theme from "./theme";
import "./style.css";

const App = () => {
	return (
		<Theme>
			<Router>
				<NavbarContainer />
				<Switch>
					<Route path="/" component={HomeContainer} exact />
					<Route path="/game" component={Game} />
					<Route path="/results/:id" component={null} />
				</Switch>
			</Router>
		</Theme>
	);
};

export default App;
