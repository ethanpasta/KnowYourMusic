import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./home/HomeContainer";
import Game from "./components/Game";
import NavbarContainer from "./navbar/NavbarContainer";
import Theme from "./theme";

import "./style.css";
import BackgroundSVG from "./shared/BackgroundSVG";

const App = () => {
	const [scrolled, setScrolled] = useState(false);
	const handleScrollEvent = val => {
		setScrolled(val);
	};
	return (
		<Theme>
			<Router>
				<BackgroundSVG />
				<NavbarContainer scrolled={scrolled} />
				<Switch>
					<Route
						path="/"
						render={() => (
							<HomeContainer
								handleScrollEvent={handleScrollEvent}
								scrolled={scrolled}
							/>
						)}
						exact
					/>
					<Route path="/game" component={Game} />
					<Route path="/results/:id" component={null} />
				</Switch>
			</Router>
		</Theme>
	);
};

export default App;
