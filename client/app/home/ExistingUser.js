import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Game from "../components/Game";
const ENDPOINT = "http://localhost:5000/game";

const accountInfoStyle = {
	textAlign: "center",
};

const buttonStyle = {
	width: "100px",
	height: "50px",
	borderRadius: "5px",
	backgroundColor: "rgba(51, 250, 255, 0.6)",
	border: "2px solid #000066",
	textAlign: "center",
	color: "#000066",
	fontSize: "19px",
};

const ExistingUser = () => {
	const [accountInfo, setAccountInfo] = useState({});
	const [redirect, setRedirect] = useState();
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		fetch("/api/me")
			.then(res => res.json())
			.then(data => {
				setAccountInfo({
					display_name: data.display_name,
					imageUrl: data.images[0].url,
				});
			});
	}, []);
	useEffect(() => {
		setSocket(socketIOClient.connect(ENDPOINT));
	}, [accountInfo]);
	const handleButtonClick = () => {
		fetch("/api/start-game");
		setRedirect(true);
	};
	if (redirect) {
		return <Game socket={socket} />;
	}
	return (
		<div>
			{Object.keys(accountInfo).length == 0 ? (
				<h1>Loading...</h1>
			) : (
				<div style={accountInfoStyle}>
					<h1>Hi, {accountInfo.display_name}</h1>
					<h2>🐔🐔🐔🐔🐔🐔🐔🐔🐔</h2>
					<img src={accountInfo.imageUrl}></img>
					<button style={buttonStyle} onClick={handleButtonClick}>
						Start Game
					</button>
					<br />
					<a href="/auth/logout">Logout</a>
				</div>
			)}
		</div>
	);
};

export default ExistingUser;
