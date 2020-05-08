import React, { useEffect, useState } from "react";

const About = () => {
	const [accountInfo, setAccountInfo] = useState();
	useEffect(() => {
		fetch("/api/me")
			.then(res => res.json())
			.then(data => {
				setAccountInfo(data);
			});
	}, []);
	return (
		<div>
			{!accountInfo ? (
				<h1>Loading...</h1>
			) : (
				<p>{JSON.stringify(accountInfo)}</p>
			)}
		</div>
	);
};

export default About;
