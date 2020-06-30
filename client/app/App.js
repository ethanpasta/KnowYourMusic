import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./home/HomeContainer";
import Game from "./game/GameContainer";
import NavbarContainer from "./navbar/NavbarContainer";
import Theme from "./theme";
import Logo from "./shared/Logo";

import "./style.css";
import BackgroundSVG from "./shared/BackgroundSVG";

const navRoutes = {
	about: "/",
	leaderboard: "/",
};
const userRoutes = {
	logout: "/auth/logout",
	"my stats": "#",
};

const App = () => {
	return (
		<Theme>
			<Router>
				<Logo />

				<BackgroundSVG />
				<NavbarContainer navRoutes={navRoutes} userRoutes={userRoutes} />
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
