import React, { useEffect, useState } from "react";

const accountInfoStyle = {
	textAlign: "center",
};

const About = () => {
	const [accountInfo, setAccountInfo] = useState();
	const [songs, setSongs] = useState([]);
	useEffect(() => {
		fetch("/api/me")
			.then(res => res.json())
			.then(data => setAccountInfo(data));
		fetch("/api/songs")
			.then(res => res.json())
			.then(data => setSongs(data.allSongs));
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
					{songs.map((song, i) => (
						<p key={i}>{song}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default About;
