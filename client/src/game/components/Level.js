import React, { useState, useEffect, useRef } from "react";
import { Heading, Grid, Flex, Text, Box } from "@chakra-ui/core";
import Option from "./Option";

const Level = ({ line, options, loading, results, handleOptionClick, handleLevelDone }) => {
	// A boolean state indicating if the level is over (including all animations)
	const [levelDone, setLevelDone] = useState(false);
	// A boolean state indicating if the results can be shown
	const [showResults, setShowResults] = useState(false);
	const [clicked, setClicked] = useState({
		clicked: false,
	});
	const timer = useRef();

	useEffect(() => {
		if (levelDone) {
			// 2 seconds to display results
			timer.current = setTimeout(() => {
				timer.current = undefined;
				setShowResults(false);
				setClicked({ clicked: false });
				setLevelDone(false);
				handleLevelDone();
			}, 2000);
		}
	}, [levelDone]);

	// Display loading icon before results are shown
	useEffect(() => {
		// If results came back and an option was clicked
		if (results && clicked.clicked) {
			/**
			 * A nice display of loading (to create suspense) even if result came back immediately.
			 * If the time passed since option was clicked is less than 1.5 seconds,
			 * wait (1.5 seconds - time passed) and then display results
			 */
			const timePassed = Date.now() - clicked.when;
			if (timePassed >= 1500) {
				setShowResults(true);
				setLevelDone(true);
			} else {
				timer.current = setTimeout(() => {
					timer.current = undefined;
					setShowResults(true);
					setLevelDone(true);
				}, 1500 - timePassed);
			}
		} else if (results) {
			setShowResults(true);
			setLevelDone(true);
		}
	}, [results]);
	// Determine the background color for each of the options, based on the results
	const getBackground = i => {
		if (!showResults || loading || !results) return "transparent";
		if (i == results.correctOption) return "green.400";
		if (i == clicked.option) return results.levelPassed ? "green.400" : "red.400";
		return "transparent";
	};
	const handleClick = i => {
		if (clicked.clicked) return;
		setClicked({
			clicked: true,
			option: i,
			when: Date.now(),
		});
		handleOptionClick(i);
	};
	return (
		<>
			<Box className="progress-bar">
				{!levelDone && <Box className={`in ${clicked.clicked ? "stop" : "play"}`} />}
			</Box>
			<Flex flexGrow="1" direction="column" justify="center" align="center">
				<Heading size="xl">{line}</Heading>
				<br />
				{showResults ? (
					<Text
						fontSize="xl"
						style={{
							color: results.levelPassed ? "green" : "red",
						}}
					>
						{clicked.clicked
							? results.levelPassed
								? "Way to go!"
								: "Wrong answer :("
							: "You didn't answer in time :("}
					</Text>
				) : (
					<Text></Text>
				)}
			</Flex>
			<Flex flexGrow="3" justify="center" w="100%">
				<Grid
					templateColumns="repeat(2, minmax(0, 1fr))"
					gap={10}
					py={10}
					w="80%"
					justifyItems="center"
					alignItems="center"
				>
					{options.map((option, i) => (
						<Option
							key={i}
							id={i}
							text={option}
							loading={!showResults || loading}
							clicked={clicked}
							onClick={handleClick}
							getBackground={getBackground}
						/>
					))}
				</Grid>
			</Flex>
		</>
	);
};

export default Level;
