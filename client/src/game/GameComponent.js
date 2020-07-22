import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@chakra-ui/core";
import { Redirect } from "react-router-dom";
import Level from "./components/Level";
import Countdown from "./components/Countdown";
import "./style.scss";

const Game = ({ data, id, gameplay, ...actions }) => {
	const [gameOver, setGameOver] = useState(false);
	// State for current level
	const [level, setLevel] = useState();
	// State for a the game countdown
	const [counter, setCounter] = useState(3);
	// General variable for all timer related functionalities
	const timer = useRef();
	const handleOptionClick = useCallback(
		chosenOption => {
			actions.sendChoiceAndListen({
				level,
				chosenOption,
			});
		},
		[level]
	);
	// When level is completely done (after showing all animations), go to the next level
	const handleLevelDone = useCallback(() => {
		clearTimeout(timer.current);
		timer.current = undefined;
		levelChange(level + 1);
	}, [level]);

	/**
	 * Handle level changes
	 * Dispatch an action to update the level in the redux store,
	 * update the level in the current component state,
	 * and set a timer for 10 seconds to change to the next level
	 */
	const levelChange = level => {
		console.log(`level is changing to ${level}`);
		if (level > Object.keys(data || {}).length) {
			setGameOver(true);
			return;
		}
		setLevel(level);
		actions.updateLevel(level);
		timer.current = setTimeout(() => {
			actions.sendChoiceAndListen({ level });
			timer.current = undefined;
		}, 10000);
	};

	// Show a 3, 2, 1 countdown
	useEffect(() => {
		if (!data || Object.keys(data || {}).length == 0) return;
		if (counter > 0) {
			setTimeout(() => setCounter(counter - 1), 1000);
		} else {
			levelChange(1);
		}
	}, [counter]);
	if (!data || Object.keys(data || {}).length == 0) {
		console.log("No game data, redirecting");
		return <Redirect to="/" />;
	}
	if (gameOver) {
		return <Redirect to={`/results/${id}`} />;
	}
	if (level === undefined) {
		return <Countdown counter={counter} />;
	} else {
		return (
			<>
				<div className="time-left" />
				<Box
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
						loading={gameplay.loading}
						results={gameplay.results[level]}
						handleOptionClick={handleOptionClick}
						handleLevelDone={handleLevelDone}
					/>
				</Box>
			</>
		);
	}
};

export default Game;
