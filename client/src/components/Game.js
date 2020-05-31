import React, { useState, useEffect } from "react";
import Level from "./Level";

const Game = ({ socket }) => {
	const [gameData, setGameData] = useState({});
	const [level, setLevel] = useState(1);

	const handleOptionClick = e => {
		const buttonId = e.target.id;
		socket.emit("submit", {
			level,
			chosen: buttonId,
		});
	};
	useEffect(() => {
		console.log(socket);
		if (socket) {
			socket.on("gameReady", data => {
				setGameData(data);
			});
		}
	}, []);
	useEffect(() => {
		const interval = setInterval(() => setLevel(level + 1), 10000);
		return () => {
			clearInterval(interval);
		};
	}, [gameData]);
	return (
		<div>
			{Object.keys(gameData).length == 0 && <h1>Loading...</h1>}
			{Object.keys(gameData).length != 0 && (
				<Level data={gameData[level]} onOptionClick={handleOptionClick} />
			)}
		</div>
	);
};

export default Game;
