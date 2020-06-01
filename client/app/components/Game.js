import React, { useState, useEffect } from "react";
import Level from "./Level";

const Game = ({ socket }) => {
	const [gameData, setGameData] = useState({});
	const [level, setLevel] = useState(0);
	const [correct, setCorrect] = useState();

	const handleOptionClick = e => {
		const buttonId = e.target.id;
		socket.emit("submit", {
			level,
			chosen: buttonId,
		});
	};
	useEffect(() => {
		socket.on("game_ready", data => setGameData(data));
		socket.on("response", correctAnswer => setCorrect(correctAnswer));
	}, []);
	useEffect(() => {
		console.log("This happened now");
		const interval = setInterval(() => setLevel(level + 1), 10000);
		return () => {
			clearInterval(interval);
		};
	}, [gameData]);
	return (
		<div>
			{Object.keys(gameData).length == 0 ? (
				<h1>Loading...</h1>
			) : (
				<Level
					data={gameData[level]}
					onOptionClick={handleOptionClick}
					levelPassed={correct}
				/>
			)}
		</div>
	);
};

export default Game;
