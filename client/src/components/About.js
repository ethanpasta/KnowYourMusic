import React, { useEffect, useState } from "react";

const accountInfoStyle = {
	textAlign: "center",
};

const About = () => {
	const [accountInfo, setAccountInfo] = useState();
	useEffect(() => {
		fetch("/api/me")
			.then(res => res.json())
			.then(data => setAccountInfo(data));
	}, []);
	return (
		<div>
			{!accountInfo ? (
				<h1>Loading...</h1>
			) : (
				<div style={accountInfoStyle}>
					<h1>Hi, {accountInfo.display_name}</h1>
					<h2>You&apos;re gay!</h2>
					<img src={accountInfo.images[0].url}></img>
					<br />
					<a href="/auth/logout">Logout</a>
				</div>
			)}
		</div>
	);
};

export default About;
