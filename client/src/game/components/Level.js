import React, { useState } from "react";
import { Box, Heading, Grid, Flex, Button, Text, PseudoBox, Spinner } from "@chakra-ui/core";

const Level = ({
	levelNumber,
	line,
	options,
	signalChoice,
	listenForLevelResponse,
	loading,
	passed,
}) => {
	console.log(`loading: ${loading} passed: ${JSON.stringify(passed)}`);
	const [clicked, setClicked] = useState({
		clicked: false,
	});
	const getBackground = i => {
		if (loading || !clicked.clicked || !passed) return "transparent";
		if (i == passed.correctOption) return "green.400";
		if (i == clicked.option) return passed.levelPassed ? "green.400" : "red.400";
		return "transparent";
	};
	const handleOptionClick = i => {
		setClicked({
			clicked: true,
			option: i,
		});
		signalChoice(i, levelNumber);
		listenForLevelResponse();
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
						<Flex key={i} justify="center" align="center" minW="60%" h="60%">
							<PseudoBox
								as={Button}
								cursor="pointer"
								w="100%"
								h="100%"
								bg={getBackground(i)}
								value={i}
								onClick={() => handleOptionClick(i)}
								d="flex"
								justifyContent="center"
								alignItems="center"
								shadow="xl"
								border="none"
								transition="all 0.15s ease"
								_hover={{ shadow: "2xl", transform: "translateY(-.1em)" }}
							>
								<Box fontSize="3xl">
									{loading && clicked.option == i ? (
										<Spinner size="lg" />
									) : (
										<>
											<Text>{option.title}</Text>
											<Text fontSize="lg">{option.artist}</Text>
										</>
									)}
								</Box>
							</PseudoBox>
						</Flex>
					))}
				</Grid>
			</Flex>
		</>
	);
};

export default Level;
