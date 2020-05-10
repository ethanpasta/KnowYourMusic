import React, { useState, useEffect } from "react";
import About from "./About";

const app_style = {
	paddingTop: "100px",
	textAlign: "center",
};

const button_style = {
	height: "60px",
	width: "120px",
	background: 'url("https://www.scdn.co/i/_global/open-graph-default.png")',
	backgroundSize: "contain",
	borderRadius: "40px",
	margin: "0 auto",
};

const Home = () => {
	const [loggedIn, setLoggedIn] = useState();
	useEffect(() => {
		fetch("/auth/check")
			.then(res => res.json())
			.then(data => {
				setLoggedIn(data.loggedIn);
			});
	}, []);
	return (
		<div>
			{loggedIn && <About />}
			{!loggedIn && (
				<div style={app_style}>
					<a href="/auth">
						<div style={button_style}></div>
					</a>
				</div>
			)}
		</div>
	);
};

export default Home;
