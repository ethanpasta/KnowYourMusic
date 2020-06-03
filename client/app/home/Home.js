import React, { useState, useEffect } from "react";
import ExistingUser from "./ExistingUser";
import NewUser from "./NewUser";

const Home = () => {
	const [loggedIn, setLoggedIn] = useState();
	useEffect(() => {
		fetch("/auth/check")
			.then(res => res.json())
			.then(data => {
				setLoggedIn(data.loggedIn);
			});
	}, []);
	return loggedIn ? <ExistingUser /> : <NewUser />;
};

export default Home;
