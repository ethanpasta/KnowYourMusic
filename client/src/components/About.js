import React, { useEffect, useState } from "react";

const accountInfoStyle = {
	textAlign: "center",
};

const About = () => {
	const [accountInfo, setAccountInfo] = useState({});
	useEffect(() => {
		fetch("/api/me")
			.then(res => res.json())
			.then(data => {
				setAccountInfo({
					display_name: data.display_name,
					imageUrl: data.images[0].url,
				});
			})
			.catch(err => console.log(err));
	}, []);
	return (
		<div style={accountInfoStyle}>
			{Object.keys(accountInfo).length == 0 ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<br />
					<a href="/auth/logout">Logout</a>
				</div>
			)}
		</div>
	);
};

export default About;
