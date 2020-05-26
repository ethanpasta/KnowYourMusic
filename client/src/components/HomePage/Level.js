import React from "react";

const Level = ({ level, gameData }) => {
	return (
		<div key={level}>
			<h1>{gameData[level].line}</h1>
			<button>
				{gameData[level].options["0"].title} - {gameData[level].options["0"].artist}
			</button>
			<button>
				{gameData[level].options["1"].title} - {gameData[level].options["1"].artist}
			</button>
			<button>
				{gameData[level].options["2"].title} - {gameData[level].options["2"].artist}
			</button>
			<button>
				{gameData[level].options["3"].title} - {gameData[level].options["3"].artist}
			</button>
		</div>
	);
};

export default Level;
