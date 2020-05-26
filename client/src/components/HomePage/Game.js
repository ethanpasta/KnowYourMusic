import React, { useState } from "react";

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
	const handleButtonClick = e => {
		fetch("/api/gameData")
			.then(res => res.json())
			.then(data => setGameData(data))
			.catch(console.error);
	};
	console.log(gameData);
	return (
		<div>
			<button style={buttonStyle} onClick={handleButtonClick}>
				Start Game
			</button>
			{Object.keys(gameData).length != 0 &&
				Object.keys(gameData).map(level => {
					return (
						<div key={level}>
							<h1>{gameData[level].line}</h1>
							<button>
								{gameData[level].options["0"].title} -{" "}
								{gameData[level].options["0"].artist}
							</button>
							<button>
								{gameData[level].options["1"].title} -{" "}
								{gameData[level].options["1"].artist}
							</button>
							<button>
								{gameData[level].options["2"].title} -{" "}
								{gameData[level].options["2"].artist}
							</button>
							<button>
								{gameData[level].options["3"].title} -{" "}
								{gameData[level].options["3"].artist}
							</button>
						</div>
					);
				})}
		</div>
	);
};

export default Game;
