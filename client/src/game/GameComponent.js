import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/core";
import { Redirect } from "react-router-dom";
import Level from "./components/Level";
import Countdown from "./components/Countdown";

const Game = ({ data, gameplay, ...actions }) => {
	const [level, setLevel] = useState();
	const [counter, setCounter] = useState(3);
	const [levelDone, setLevelDone] = useState(false);

	const levelChange = level => {
		if (level > Object.keys(data).length) {
			level = 1;
		}
		actions.updateLevel(level);
		setLevel(level);
		setTimeout(() => levelChange(level + 1), 10000);
	};
	const handleClick = () => {
		if (!gameplay.loading) {
			setLevelDone(true);
		}
		gameplay.loading && setLevelDone(true);
	};
	useEffect(() => {
		console.log(`COUNTER ${counter}`);
		if (counter > 0) {
			setTimeout(() => setCounter(counter - 1), 1000);
		} else {
			console.log("Game Starting");
			levelChange(1);
		}
	}, [counter]);

	if (!data || Object.keys(data || {}).length == 0) {
		console.log("No game data, redirecting");
		return <Redirect to="/" />;
	}
	if (level === undefined) {
		console.log(`Still loading ${counter}, level ${level}`);
		return <Countdown counter={counter} />;
	} else {
		console.log(`counter: ${counter}, level: ${level}`);
		return (
			<Box
				className="game-body"
				flexGrow="2"
				d="flex"
				flexDirection="column"
				h="full"
				w="full"
				alignItems="center"
			>
				<Level
					levelNumber={level}
					line={data[level].line}
					options={Object.values(data[level].options)}
					sendChoiceAndListen={actions.sendChoiceAndListen}
					loading={gameplay.loading}
					passed={gameplay.gameProgress && gameplay.gameProgress[level]}
					handleClick={handleClick}
				/>
			</Box>
		);
	}
};

export default Game;
