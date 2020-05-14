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
				return fetch("/api/songs");
			})
			.then(res => res.json())
			.then(data =>
				setAccountInfo(prevState => ({
					...prevState,
					songs: data.allSongs,
				}))
			)
			.catch(err => console.log(err));
	}, []);
	return (
		<div>
			{Object.keys(accountInfo).length == 0 ? (
				<h1>Loading...</h1>
			) : (
				<div style={accountInfoStyle}>
					<h1>Hi, {accountInfo.display_name}</h1>
					<h2>You&apos;re gay!</h2>
					<img src={accountInfo.imageUrl}></img>
					<br />
					<a href="/auth/logout">Logout</a>
					{accountInfo.songs.map((song, i) => (
						<p key={i}>{song}</p>
					))}
				</div>
			)}
		</div>
	);
};

export default About;
