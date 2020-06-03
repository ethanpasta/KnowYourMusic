import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Game from "./components/Game";
import { default as Navbar } from "./navbar/NavbarContainer";
import Footer from "./Footer";
import Theme from "./theme";
import "./style.css";

const App = () => {
	return (
		<Theme>
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/game" component={Game} />
					<Route path="/results/:id" component={null} />
				</Switch>
				<Footer />
			</Router>
		</Theme>
	);
};

export default App;
