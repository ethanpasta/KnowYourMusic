import React, { useState, useEffect } from "react";
import { Text, Button, PseudoBox, Spinner } from "@chakra-ui/core";
import { Redirect } from "react-router-dom";

const StartGame = ({ gameLoading }) => {
	const [loading, setLoading] = useState();
	const [ready, setReady] = useState(false);
	const handleClick = () => {
		setReady(!loading);
	};
	useEffect(() => setLoading(gameLoading), [gameLoading]);
	return ready ? (
		<Redirect to="/game" />
	) : (
		<PseudoBox
			className="glow-button"
			role="group"
			as={Button}
			w="50%"
			h="5em"
			borderRadius="5em"
			shadow="lg"
			bg="transparent"
			mt={8}
			minWidth="fit-content"
			cursor="pointer"
			onClick={handleClick}
		>
			{loading ? (
				<Spinner />
			) : (
				<Text
					fontSize={{ base: "2xl", lg: "3xl" }}
					px={{ base: 2, lg: "0" }}
					fontWeight="800"
				>
					<i>START GAME</i>
				</Text>
			)}
		</PseudoBox>
	);
};

export default StartGame;
