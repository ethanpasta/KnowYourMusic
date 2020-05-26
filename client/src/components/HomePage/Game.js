import React, { useState, useEffect } from "react";
import Level from "./Level";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:5000/";

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

const Game = () => {
	const [gameData, setGameData] = useState({});
	const handleButtonClick = () => {
		fetch("/api/gameData")
			.then(res => res.json())
			.then(data => setGameData(data))
			.catch(console.error);
	};
	useEffect(() => {
		const socket = socketIOClient.connect("http://localhost:5000/game");
		socket.emit("hi");
	}, []);
	return (
		<div>
			<button style={buttonStyle} onClick={handleButtonClick}>
				Start Game
			</button>
			{Object.keys(gameData).length != 0 &&
				Object.keys(gameData).map(level => (
					<Level key={level} level={level} gameData={gameData} />
				))}
		</div>
	);
};

export default Game;
