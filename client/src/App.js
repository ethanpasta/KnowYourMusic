import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./home/HomeContainer";
import Game from "./game/GameContainer";
import NavbarContainer from "./navbar/NavbarContainer";
import Theme from "./theme";
import Logo from "./shared/Logo";
import { NAV_ROUTES, USER_NAV_ROUTES } from "./constants";

import "./style.css";

const App = () => {
	return (
		<Theme>
			<Router>
				<Logo />
				<NavbarContainer navRoutes={NAV_ROUTES} userRoutes={USER_NAV_ROUTES} />
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
