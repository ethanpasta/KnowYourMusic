import React, { useState, useEffect } from "react";
import { Heading, Grid, Flex } from "@chakra-ui/core";
import Option from "./Option";

const Level = ({
	levelNumber,
	line,
	options,
	sendChoiceAndListen,
	loading,
	passed,
	handleClick,
}) => {
	console.log(`loading: ${loading} passed: ${JSON.stringify(passed)}`);
	const [clicked, setClicked] = useState({
		clicked: false,
	});
	useEffect(() => {
		setClicked({ clicked: false });
	}, [levelNumber]);
	const getBackground = i => {
		if (loading || !clicked.clicked || !passed) return "transparent";
		if (i == passed.correctOption) return "green.400";
		if (i == clicked.option) return passed.levelPassed ? "green.400" : "red.400";
		return "transparent";
	};
	const handleOptionClick = i => {
		if (clicked.clicked) return;
		setClicked({
			clicked: true,
			option: i,
		});
		sendChoiceAndListen({ level: levelNumber, chosenOption: i });
		handleClick();
	};
	return (
		<>
			<Flex flexGrow="1" justify="center" align="center">
				<Heading size="xl">{line}</Heading>
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
							loading={loading}
							clicked={clicked}
							onClick={handleOptionClick}
							getBackground={getBackground}
						/>
					))}
				</Grid>
			</Flex>
		</>
	);
};

export default Level;
